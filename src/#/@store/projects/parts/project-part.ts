import map from 'lodash/map';

import { IProjectPart } from '@types';

export class ProjectPart implements IProjectPart {
  id: number = 0;
  parentId: number = 0;
  projectId: number = 0;
  title: string = '';

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
