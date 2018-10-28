import { ITask, Task } from 'src/store/tasks';
import { User } from 'src/store/users';

export interface IProjectTask extends ITask {
  users: User[];
}

export class ProjectTask extends Task implements IProjectTask {
  public users: User[] = [];

  constructor(initial?: any) {
    super(initial);
    if (initial && initial.users) {
      this.users = initial.users.map((user: Partial<User>) => new User(user));
      return;
    }
  }
}
