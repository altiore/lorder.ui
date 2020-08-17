import map from 'lodash/map';

import { IMedia, IUser, ROLE } from '@types';

export class User implements IUser {
  readonly id?: number;
  avatar: IMedia;
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

  get userName(): string {
    return this.displayName || (this.email ? this.email.replace(/@.*$/, '') : `[Noname ${this.id}]`);
  }

  get shortName(): string {
    if (this.displayName) {
      const parts = this.displayName.split(' ');
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      } else {
        this.displayName.substring(0, 2).toUpperCase();
      }
    }
    if (this.email) {
      return this.email.substring(0, 2).toUpperCase();
    }

    return 'N/A';
  }

  get avatarUrl(): string | undefined {
    if (this.avatar && this.avatar.url) {
      return this.avatar.url;
    }

    return undefined;
  }
}
