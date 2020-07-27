import map from 'lodash/map';

import { ITasksFilter } from '@types';

export enum TASK_FILTER_TYPE {
  RECENT = 'recent',
  SMART = 'smart',
  NEW = 'new',
}

export const STATUS_TYPE_NAME = {
  CREATING: 'creating',
  DONE: 'done',
  IN_PROGRESS: 'in-progress',
  TESTING: 'testing',
  TO_DO: 'ready-to-do',
};

export class TasksFilter implements ITasksFilter {
  filter: TASK_FILTER_TYPE = TASK_FILTER_TYPE.RECENT;
  projectPart?: '';
  search?: string = '';
  members: number[] = [];
  openedStatuses: string[] = [STATUS_TYPE_NAME.TO_DO, STATUS_TYPE_NAME.IN_PROGRESS, STATUS_TYPE_NAME.TESTING];
  projectId: number = 0;
  selectedRole?: string;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
