import map from 'lodash/map';

import { ITasksFilter } from '@types';

export enum TASK_FILTER_TYPE {
  RECENT = 'recent',
  SMART = 'smart',
  NEW = 'new',
}

export class TasksFilter implements ITasksFilter {
  filter: TASK_FILTER_TYPE = TASK_FILTER_TYPE.RECENT;
  search?: string;
  members: number[] = [];
  openedStatuses: number[] = [1, 2, 3];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
