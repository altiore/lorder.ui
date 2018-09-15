import map from 'lodash-es/map';

export interface IUserRole {
  id: number;
  name: 'user' | 'admin' | 'super-admin';
}

export class UserRole implements IUserRole {
  public readonly id: number;
  public readonly name: 'user' | 'admin' | 'super-admin';

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}

export interface IUser {
  readonly id?: number;
  readonly email: string;
  tel: string;
  readonly status: number;
  paymentMethod: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  role: string;
}

export class User implements IUser {
  public readonly id?: number;
  public readonly email: string;
  public tel: string;
  public readonly status: number = 1;
  public paymentMethod: number;
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public role: 'admin' | 'super-admin' | 'user' = 'user';

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'roles') {
        this.role = { 1: 'user', 2: 'admin', 3: 'super-admin' }[val.length];
      } else {
        this[key] = val;
      }
    });
  }

  public get userName() {
    return this.email;
  }
}
