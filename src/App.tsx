import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  taskName: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (taskName: string): void => {
    const newTaskList = [...taskList, { taskName, done: false }];
    setTaskList(newTaskList);
  };

  const toggleDoneTask = (index: number): void => {
    const newTaskList: ITask[] = [...taskList];
    newTaskList[index].done = !newTaskList[index].done;
    setTaskList(newTaskList);
  };

  const removeTask = (index: number): void => {
    const newTaskList: ITask[] = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    setNewTask(e.target.value);
                  }}
                  value={newTask}
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-primary btn-block mt-2">
                  Guardar
                </button>
              </form>
            </div>
          </div>
          {taskList.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.taskName}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
