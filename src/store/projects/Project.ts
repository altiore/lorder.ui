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
  public projectTaskTypes: TaskType[];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'projectTaskTypes') {
        this[key] = map(val, projectTaskType => new TaskType(projectTaskType.taskType));
        return;
      }
      this[key] = val;
    });
  }
}
