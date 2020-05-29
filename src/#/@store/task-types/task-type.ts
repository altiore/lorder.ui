import map from 'lodash/map';

import { ITaskType, TASK_TYPE } from '@types';

export class TaskType implements ITaskType {
  readonly id: number;
  readonly name: TASK_TYPE;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
