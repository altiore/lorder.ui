import { ITask, Task } from 'src/store/tasks';
import { User } from 'src/store/users';

export interface IProjectTask extends ITask {
  users: User[];
}

export class ProjectTask extends Task implements IProjectTask {
  public users: User[] = [];

  constructor(initial?: object) {
    super(initial);
  }
}
