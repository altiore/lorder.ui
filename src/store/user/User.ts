import map from 'lodash-es/map'

export type IUserRole = 'guest'|'user'|'admin'|'super-admin';

export interface IUserState {
  email?: string;
  isAuth: boolean;
  isLoading: boolean;
  role?: IUserRole;
  token?: string;
}

export class User implements IUserState {
  public readonly email: string;
  public readonly isAuth: boolean = false;
  public readonly isLoading: boolean = false;
  public readonly role: IUserRole = 'guest';
  public readonly token: string;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
