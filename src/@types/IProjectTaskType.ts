import { ITaskType } from './ITaskType';

export interface IProjectTaskType {
  order: number;
  taskType: ITaskType;
  taskTypeId: number;
  projectId: number;
}
