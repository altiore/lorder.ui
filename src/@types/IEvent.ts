import { ITask } from './ITask';
import { IUserWorkEditable } from './IUserWork';

export interface IEvent {
  userWork: IUserWorkEditable;

  task: ITask;

  isActive: boolean;
  name: string;
}
