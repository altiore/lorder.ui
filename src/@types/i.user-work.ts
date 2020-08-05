import moment from 'moment';

import { ITask } from './i.task';

export interface IUserWorkEditable {
  id?: number;

  // required
  projectId: number;
  taskId: number;

  description?: string;
  finishAt: moment.Moment | null; // "2018-05-26T09:05:39.378Z",
  source?: string | null;
  startAt: moment.Moment; // "2018-05-26T09:05:39.378Z",
  value?: number;
}

export interface IUserWorkAPI extends IUserWorkEditable {
  prevProjectId?: number;
  prevTaskId?: number;
  taskTypeId?: number;
  userId: number;

  prevTask?: ITask;
  task?: ITask;
  taskType: any;
}

export interface IUserWork extends IUserWorkAPI {
  duration?: string;
  durationInSeconds: number;
}
