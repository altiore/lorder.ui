import map from 'lodash/map';

import { IProjectRole, ISelectedProject } from '@types';

export class SelectedProject implements ISelectedProject {
  roles: IProjectRole[] = [];
  members: any[] = [];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
