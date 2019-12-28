import { ITask } from './ITask';

export enum TASK_CHANGE_TYPE {
  CREATE = 'create',
  UPDATE = 'update',
  MOVE = 'move',
  ARCHIVE = 'archive',
  DELETE = 'delete',
}

export interface ITaskLog {
  readonly id: number;
  readonly changeType: TASK_CHANGE_TYPE;
  readonly prevVersion: ITask;
  readonly description?: string;
  readonly createdAt: any;
  readonly taskId: number;
  readonly createdBy: number;
}
