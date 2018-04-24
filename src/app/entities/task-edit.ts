import { TaskModel } from "./task";
import { status } from "./status";

export interface TaskEdit {
    status: status;
    task: TaskModel;
  }