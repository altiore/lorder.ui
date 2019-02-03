import map from 'lodash-es/map';

import { convertSecondsToDurationWithLocal } from 'src/store/@common/helpers';
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
  id?: number;
  uuid?: string;
  accessLevel?: ACCESS_LEVEL;
  title: string;
  monthlyBudget?: number;
  owner?: any;
  ownerId?: number;
  phases?: any[];
  members: DownloadList<Member> = new DownloadList(Member);
  tasks: DownloadList<ProjectTask> = new DownloadList(ProjectTask);
  taskTypes: DownloadList<TaskType> = new DownloadList(TaskType);
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;

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
    return convertSecondsToDurationWithLocal(this.timeSum || 0);
  }
}
