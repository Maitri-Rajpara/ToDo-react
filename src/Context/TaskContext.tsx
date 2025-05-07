import React ,{ createContext, useState, useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  desc: string;
  status: TaskStatus;
}

export enum TaskStatus {
  Todo = "todo",
  InProgress = "InProgress",
  Completed = "Completed",
}

interface TaskContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined,
);

export function TaskProvider(props: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {props.children}
    </TaskContext.Provider>
  );
}
