import map from 'lodash/map';

import { User } from '#/#/@store/users';

import { IMember, IProjectRole, IUser, MAP_ROLE, ROLE_FLOW } from '@types';

export class Member implements IMember {
  accessLevel: number;
  roles: IProjectRole[] = [];
  member: IUser;
  timeSum: number;
  valueSum: number;
  opinion?: string;

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
    if (!this.roles.length) {
      return 'Участник';
    }

    const arch = this.roles.find(el => el.roleId === ROLE_FLOW.ARCHITECT);
    const mainDev = this.roles.find(el => el.roleId === ROLE_FLOW.DEVELOPER);
    const designer = this.roles.find(el => el.roleId === ROLE_FLOW.DESIGNER);

    return MAP_ROLE[(arch || mainDev || designer)?.roleId || this.roles[0].roleId];
  }
}
