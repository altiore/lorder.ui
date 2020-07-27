import map from 'lodash/map';

import { IUserRole } from '@types';

export class UserRole implements IUserRole {
  id: string;
  name: string;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
