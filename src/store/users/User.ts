import map from 'lodash-es/map';

export interface IUserRole {
  id: number;
  name: 'user' | 'admin' | 'super-admin';
}

export class UserRole implements IUserRole {
  readonly id: number;
  readonly name: 'user' | 'admin' | 'super-admin';

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
  projectsCount: number;
}

export class User implements IUser {
  readonly id?: number;
  readonly email: string;
  tel: string;
  readonly status: number = 1;
  paymentMethod: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  role: 'admin' | 'super-admin' | 'user' = 'user';
  projectsCount: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'roles') {
        this.role = { 1: 'user', 2: 'admin', 3: 'super-admin' }[val.length];
      } else {
        this[key] = val;
      }
    });
  }

  get userName() {
    return this.email;
  }
}
