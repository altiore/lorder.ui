import map from 'lodash/map';

import { ROLE } from '../../@types';

export interface IIdentityState {
  id?: number;
  email?: string;
  avatar?: string;
  isAuth: boolean;
  isLoading: boolean;
  role?: ROLE;
  bearerKey?: string;
  defaultProjectId?: number;
}

export class Identity implements IIdentityState {
  readonly id?: number;
  readonly email: string;
  readonly avatar?: string;
  readonly isAuth: boolean = false;
  readonly isLoading: boolean = false;
  readonly role: ROLE = ROLE.GUEST;
  readonly bearerKey: string;
  readonly defaultProjectId?: number;

  constructor(initial?: Partial<IIdentityState>) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
