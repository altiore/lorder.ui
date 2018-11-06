import map from 'lodash-es/map';

import { covertSecondsToDurationWithLocal } from 'src/store/@common/helpers';
import { DownloadList } from '../@common/entities';
import { TaskType } from '../task-types';
import { Member } from './members/Member';
import { ProjectTask } from './tasks/ProjectTask';

export enum ACCESS_LEVEL {
  WHITE = 0,
  RED = 1,
  ORANGE = 2,
  YELLOW = 3,
  GREEN = 4,
  BLUE = 5,
  INDIGO = 6,
  VIOLET = 7,
}

export class Project {
  public id?: number;
  public accessLevel?: ACCESS_LEVEL;
  public title: string;
  public monthlyBudget?: number;
  public owner?: any;
  public phases?: any[];
  public members: Member[] = [];
  public tasks: DownloadList<ProjectTask> = new DownloadList(ProjectTask);
  public taskTypes: DownloadList<TaskType> = new DownloadList(TaskType);
  /** время в секундах, потраченное всеми пользователями на этот проект */
  public timeSum?: number;
  /** ценность всех задач в этом проекте */
  public valueSum?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'tasks') {
        this[key] = new DownloadList(ProjectTask, val, Array.isArray(val));
        return;
      }
      if (key === 'taskTypes') {
        this[key] = new DownloadList(TaskType, val, Array.isArray(val));
        return;
      }
      if (key === 'members') {
        this[key] = map(val, (member: Partial<Member>) => new Member(member));
        return;
      }
      if (key === 'accessLevel') {
        this[key] = typeof val === 'number' ? val : val && val.accessLevel;
        return;
      }
      this[key] = val;
    });
  }

  get fullProjectTimeHumanize() {
    return covertSecondsToDurationWithLocal(this.timeSum || 0);
  }
}
