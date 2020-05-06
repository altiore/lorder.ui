import map from 'lodash/map';

import { User } from '#/#/@store/users';

import { IUser } from '@types';

export interface IMember {
  accessLevel: number;
  member: IUser;
}

export class Member implements IMember {
  accessLevel: number;
  roles: string[];
  member: IUser;
  timeSum: number;
  valueSum: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'member') {
        this.member = new User(val);
      } else {
        this[key] = val;
      }
    });
  }
}
