import map from 'lodash/map';

import { ITasksFilter } from '@types';

export class TasksFilter implements ITasksFilter {
  filter: string = 'recent';
  search?: string;
  members: number[] = [];
  openedStatuses: number[] = [1, 2, 3];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
