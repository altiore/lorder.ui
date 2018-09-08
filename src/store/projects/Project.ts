import map from 'lodash-es/map';

import { TaskType } from '../task-types';
import { User } from '../users';

export class Project {
  public id?: number;
  public title: string;
  public monthlyBudget?: number;
  public owner?: any;
  public phases?: any[];
  public projectMembers: User[];
  public taskTypes: TaskType[];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'taskTypes') {
        this[key] = map(val, taskType => new TaskType(taskType));
        return;
      }
      this[key] = val;
    });
  }
}
