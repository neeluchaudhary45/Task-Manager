
"use client"
import "../globals.css";


import React, { useState, ChangeEvent, useEffect, JSX } from "react";



type TaskType = {
  id: number;
  value: string;
  status: string;
};

export default function TaskManager(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [task, setTask] = useState<TaskType[]>([]);
  const [viewtask, setViewTask] = useState<boolean>(false);

    useEffect(() => {
    const stored = localStorage.getItem("list");
    if (stored) {
      setTask(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(task));
  }, [task]);

  const onChangeHeandeler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickAddButtonHeandeler = (): void => {
    setTask([
      {
        id: Math.random(),
        value: value,
        status: "pending",
      },
      ...task,
    ]);

    setValue("");
  };

  const onClickDltHeandeler = (id: number): void => {
    const filterditems = task.filter((dltItem) => dltItem.id !== id);
    setTask(filterditems);
  };

  const viewTaskHeandler = (): void => {
    setViewTask((item) => !item);
  };

  const onChangeStatus = (e: any, id: number): void => {
    console.log(e.target.value, id);

    const statusUpdated = task.map((ele) => {
      if (ele.id == id) {
        ele.status = e.target.value;
      }
      return ele;
    });

    setTask(statusUpdated);
  };

  return (
    <div className="App">
      <div className="inputWrapper">
        <input
          type="text"
          value={value}
          onChange={onChangeHeandeler}
          placeholder="Create a task"
        />
        <button onClick={onClickAddButtonHeandeler}>add</button>
      </div>

      <button onClick={viewTaskHeandler} className="ViewTask">
        View Task - <span> {task.length}</span>
      </button>

      {viewtask && (
        <div className="viewTaskWrapper">
          {task.length ? (
            <ul>
              {task.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={
                      item.status == "pending" ? "pending" : "complete"
                    }
                  >
                    <p>{item.value}</p>
                    <div className="buttonWrapper">
                      <button onClick={() => onClickDltHeandeler(item.id)}>
                        delete
                      </button>

                      <select
                        onChange={(event) => onChangeStatus(event, item.id)}
                      >
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                      </select>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h1>No Added Task</h1>
          )}
        </div>
      )}
    </div>
  );
}
