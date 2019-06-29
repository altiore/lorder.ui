import { ITask } from '@types';
import { Task } from '@store/tasks';
import { User } from '@store/users';

export interface IProjectTask extends ITask {
  users: User[];
}

export class ProjectTask extends Task implements IProjectTask {
  users: User[] = [];

  constructor(initial?: any) {
    super(initial);
    if (initial && initial.users) {
      this.users = initial.users.map((user: Partial<User>) => new User(user));
      return;
    }
  }
}
