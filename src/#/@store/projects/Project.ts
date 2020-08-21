import map from 'lodash/map';

import { DownloadList } from '#/@store/@common/entities';
import { convertSecondsToDurationWithLocal } from '#/@store/@common/helpers';
import { Task } from '#/@store/tasks';

import { ProjectPart } from '../project';
import { TaskType } from '../task-types';
import { Member } from './members/Member';
import { ProjectTaskType } from './taskTypes/project-task-type';

import {
  ACCESS_LEVEL,
  IDownloadList,
  IMedia,
  IProject,
  IProjectPart,
  IProjectRole,
  IProjectStrategyInfo,
  IProjectTaskType,
  IRoleColumn,
  PROJECT_STRATEGY,
  PROJECT_TYPE,
} from '@types';

export class Project implements IProject {
  id?: number;
  uuid?: string;
  accessLevel?: ACCESS_LEVEL;
  title: string;
  desc?: string;
  slogan?: string;
  strategy: PROJECT_STRATEGY = PROJECT_STRATEGY.SIMPLE;
  monthlyBudget?: number;
  owner?: any;
  ownerId?: number;
  phases?: any[];
  members: DownloadList<Member> = new DownloadList(Member);
  tasks: DownloadList<Task> = new DownloadList(Task);
  projectTaskTypes: IDownloadList<IProjectTaskType> = new DownloadList(ProjectTaskType);
  parts: DownloadList<IProjectPart> = new DownloadList(ProjectPart);
  strategyInfo: IProjectStrategyInfo;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;
  type: PROJECT_TYPE;
  taskColumns: IRoleColumn[] = [];
  pub?: any;
  roles?: IProjectRole[];

  logo?: IMedia;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'tasks') {
        this[key] = new DownloadList(Task, val, Array.isArray(val));
        return;
      }
      if (key === 'projectTaskTypes') {
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
      if (key === 'parts') {
        this[key] = typeof val === 'number' ? val : val && val.parts;
        return;
      }
      this[key] = val;
    });
  }

  get shortName(): string {
    if (this.title) {
      const titleParts = this.title.split(' ');
      if (titleParts.length > 1 && titleParts[1].length) {
        return titleParts[0][0].toUpperCase() + titleParts[1][0].toUpperCase();
      } else {
        const firstChar = this.title[0];
        const secondChar = this.title.slice(1).replace(/[euoa]/g, '')[0] || '';
        return `${firstChar}${secondChar}`.toUpperCase();
      }
    }

    return 'N/A';
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
