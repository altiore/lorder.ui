import map from 'lodash/map';

import { IProjectPart, ISelectedProject } from '@types';

export class SelectedProject implements ISelectedProject {
  roles: any[] = [];
  members: any[] = [];
  selected?: number;
  parts: IProjectPart[] = [];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
