import { ITask } from './i.task';
import { IUserWorkEditable } from './i.user-work';

export interface IEvent {
  userWork: IUserWorkEditable;

  task: ITask;

  isActive: boolean;
  name: string;
}
