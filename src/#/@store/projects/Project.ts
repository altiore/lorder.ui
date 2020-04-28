import map from 'lodash/map';

import { convertSecondsToDurationWithLocal } from '#/@store/@common/helpers';
import { Task } from '#/@store/tasks';

import { DownloadList } from '../@common/entities';
import { TaskType } from '../task-types';
import { Member } from './members/Member';

import { ACCESS_LEVEL, IProject } from '@types';

export class Project implements IProject {
  id?: number;
  uuid?: string;
  accessLevel?: ACCESS_LEVEL;
  title: string;
  monthlyBudget?: number;
  owner?: any;
  ownerId?: number;
  phases?: any[];
  members: DownloadList<Member> = new DownloadList(Member);
  tasks: DownloadList<Task> = new DownloadList(Task);
  taskTypes: DownloadList<TaskType> = new DownloadList(TaskType);
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'tasks') {
        this[key] = new DownloadList(Task, val, Array.isArray(val));
        return;
      }
      if (key === 'taskTypes') {
        this[key] = new DownloadList(TaskType, val, Array.isArray(val));
        return;
      }
      if (key === 'members') {
        this[key] = new DownloadList(Member, val, Array.isArray(val));
        return;
      }
      if (key === 'accessLevel') {
        this[key] = typeof val === 'number' ? val : val && val.accessLevel;
        return;
      }
      this[key] = val;
    });
  }

  get fullProjectTimeHumanize(): string | undefined {
    return convertSecondsToDurationWithLocal(this.timeSum ? this.timeSum / 1000 : 0, 8);
  }

  get shareTime(): string {
    if (this.timeSum) {
      return convertSecondsToDurationWithLocal(this.timeSum / 1000, 8);
    }

    return '0';
  }

  get shareValue(): number {
    if (this.valueSum) {
      return this.valueSum;
    }

    return 0;
  }
}
