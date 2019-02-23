import map from 'lodash-es/map';

import { IUser } from 'src/@types';
import { User } from '../../users';

export interface IMember {
  accessLevel: number;
  member: IUser;
}

export class Member implements IMember {
  accessLevel: number;
  member: IUser;

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
