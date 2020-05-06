import map from 'lodash/map';

import { ITasksFilter } from '@types';

export class TasksFilter implements ITasksFilter {
  filter: string = 'recent';
  search?: string;
  members: number[] = [];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
