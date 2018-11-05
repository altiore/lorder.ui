import map from 'lodash-es/map';

import { ROLE } from '../../@types';

export interface IIdentityState {
  email?: string;
  isAuth: boolean;
  isLoading: boolean;
  role?: ROLE;
  bearerKey?: string;
}

export class Identity implements IIdentityState {
  public readonly email: string;
  public readonly isAuth: boolean = false;
  public readonly isLoading: boolean = false;
  public readonly role: ROLE = ROLE.GUEST;
  public readonly bearerKey: string;

  constructor(initial?: Partial<IIdentityState>) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
