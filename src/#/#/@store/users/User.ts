import map from 'lodash/map';

import { IUser, ROLE } from '@types';

export class User implements IUser {
  readonly id?: number;
  avatar: {
    url: string;
  };
  readonly email: string;
  tel: string;
  readonly status: number = 1;
  paymentMethod: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  role: ROLE = ROLE.USER;
  projectsCount: number;
  displayName?: string;
  defaultProjectId: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'roles') {
        this.role = { 1: 'user', 2: 'admin', 3: 'super-admin' }[val.length];
      } else {
        this[key] = val;
      }
    });
  }

  get userName() {
    return this.email;
  }

  get shortName() {
    return this.email.substring(0, 2).toUpperCase();
  }
}
