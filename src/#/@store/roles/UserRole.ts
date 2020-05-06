import map from 'lodash/map';

import { IUserRole } from '@types';

export class UserRole implements IUserRole {
  id: number;
  name: string;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
