import map from 'lodash-es/map';

import { covertSecondsToDuration } from 'src/store/@common/helpers';
import { UserWork } from 'src/store/user-works';
// import { User } from 'src/store/users';

export interface ITask {
  id: number;
  title: string;
  description: string;
  projectId: number;
  value: number;
  // users: User[];
  userWorks: UserWork[];
}

export class Task implements ITask {
  public id: number;
  public title: string;
  public description: string;
  public projectId: number;
  public value: number;
  // public users: User[] = [];
  public userWorks: UserWork[] = [];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'userWorks') {
        this[key] = val.map((userWork: Partial<UserWork>) => new UserWork(userWork));
        return;
      }
      // if (key === 'users') {
      //   this[key] = val.map((user: Partial<User>) => new User(user));
      //   return;
      // }
      this[key] = val;
    });
  }

  get durationInSeconds(): number {
    return this.userWorks.reduce((res, current) => res + current.durationInSeconds, 0);
  }

  get duration(): string {
    return covertSecondsToDuration(this.durationInSeconds);
  }
}
