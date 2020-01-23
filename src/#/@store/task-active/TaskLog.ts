import map from 'lodash/map';

import { ITask, ITaskLog, TASK_CHANGE_TYPE } from '@types';

export class TaskLog implements ITaskLog {
  readonly id: number;
  readonly changeType: TASK_CHANGE_TYPE;
  readonly prevVersion: ITask;
  readonly description?: string;
  readonly createdAt: any;
  readonly taskId: number;
  readonly createdBy: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
