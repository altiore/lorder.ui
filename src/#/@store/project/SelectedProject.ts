import map from 'lodash/map';

import { ISelectedProject } from '@types';

export class SelectedProject implements ISelectedProject {
  roles: any[];
  selected?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
