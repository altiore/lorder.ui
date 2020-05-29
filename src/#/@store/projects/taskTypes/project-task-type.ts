import map from 'lodash/map';

import { IProjectTaskType, ITaskType } from '@types';

export class ProjectTaskType implements IProjectTaskType {
  order: number;
  projectId: number;
  taskType: ITaskType;
  taskTypeId: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
