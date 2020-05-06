import map from 'lodash/map';

import { ITaskStatus } from '@types';

export class TaskStatus implements ITaskStatus {
  id: number;
  name: string;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
