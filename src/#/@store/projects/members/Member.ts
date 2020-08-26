import map from 'lodash/map';

import { User } from '#/#/@store/users';
import { getMemberRole } from '#/@store/@common/helpers/get-member-role';

import { IMember, IProjectRole, IUser } from '@types';

export class Member implements IMember {
  accessLevel: number;
  roles: IProjectRole[] = [];
  member: IUser;
  timeSum: number;
  valueSum: number;
  opinion?: string;
  projectId: number;
  memberId: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'member') {
        this.member = new User(val);
      } else {
        this[key] = val;
      }
    });
  }

  get memberRole(): string {
    return getMemberRole(this.roles);
  }
}
