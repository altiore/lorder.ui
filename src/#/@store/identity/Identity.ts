import map from 'lodash/map';

import { ROLE } from '@types';

export interface IIdentityState {
  // fields from Back End
  id?: number;
  avatar?: string;
  defaultProjectId?: number;
  displayName?: string;
  email?: string;
  expiresIn?: number;
  refreshToken?: string;
  role?: ROLE;
  tel?: string;

  // added by UI
  isAuth: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
}

export class Identity implements IIdentityState {
  readonly id?: number;
  readonly avatar?: string;
  readonly defaultProjectId?: number;
  readonly displayName?: string;
  readonly email: string;
  readonly expiresIn?: number;
  readonly refreshToken: string;
  readonly role: ROLE = ROLE.GUEST;
  readonly tel?: string;

  readonly isAuth: boolean = false;
  readonly isLoading: boolean = false;
  readonly isRefreshing: boolean = false;

  constructor(initial?: Partial<IIdentityState>) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
