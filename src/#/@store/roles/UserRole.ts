import map from 'lodash/map';

import { IUserRole, ROLE_FLOW } from '@types';

export class UserRole implements IUserRole {
  id: string;
  name: ROLE_FLOW;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
