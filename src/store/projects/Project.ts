import map from 'lodash-es/map';

import { TaskType } from '../task-types';
import { Member } from './members/Member';

export class Project {
  public id?: number;
  public title: string;
  public monthlyBudget?: number;
  public owner?: any;
  public phases?: any[];
  public members: Member[];
  public taskTypes: TaskType[];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'taskTypes') {
        this[key] = map(val, (taskType: Partial<TaskType>) => new TaskType(taskType));
        return;
      }
      if (key === 'members') {
        this[key] = map(val, (member: Partial<Member>) => new Member(member));
        return;
      }
      this[key] = val;
    });
  }
}
