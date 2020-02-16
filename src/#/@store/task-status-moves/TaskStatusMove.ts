import map from 'lodash/map';

import { ITaskStatusMove } from '@types';

export class TaskStatusMove implements ITaskStatusMove {
  id: number;
  name?: string;
  fromId: number;
  toId: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
