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

export type FormValues = {
  title: string;
  desc: string;
};
