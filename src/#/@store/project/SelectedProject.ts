import map from 'lodash/map';

import { IProjectPart, IProjectRole, ISelectedProject } from '@types';

export class SelectedProject implements ISelectedProject {
  roles: IProjectRole[] = [];
  members: any[] = [];
  parts: IProjectPart[] = [];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
