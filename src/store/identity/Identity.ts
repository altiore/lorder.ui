import map from 'lodash-es/map'

export type IIdentityRole = 'guest'|'user'|'admin'|'super-admin';

export interface IIdentityState {
  email?: string;
  isAuth: boolean;
  isLoading: boolean;
  role?: IIdentityRole;
  token?: string;
}

export class Identity implements IIdentityState {
  public readonly email: string;
  public readonly isAuth: boolean = false;
  public readonly isLoading: boolean = false;
  public readonly role: IIdentityRole = 'guest';
  public readonly token: string;

  constructor(initial?: IIdentityState) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
