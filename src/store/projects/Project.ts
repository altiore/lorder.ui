import map from 'lodash-es/map';

import { DownloadList } from '../@common/entities';
import { TaskType } from '../task-types';
import { Member } from './members/Member';
import { Task } from './tasks/Task';

export class Project {
  public id?: number;
  public title: string;
  public monthlyBudget?: number;
  public owner?: any;
  public phases?: any[];
  public members: Member[];
  public tasks: DownloadList<Task>;
  public taskTypes: DownloadList<TaskType>;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'tasks') {
        this[key] = new DownloadList(Task, val);
        return;
      }
      if (key === 'taskTypes') {
        this[key] = new DownloadList(TaskType, val);
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
