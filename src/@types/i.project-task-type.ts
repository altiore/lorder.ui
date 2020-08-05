import { ITaskType } from './i-task-type';

export interface IProjectTaskType {
  order: number;
  taskType: ITaskType;
  taskTypeId: number;
  projectId: number;
}
