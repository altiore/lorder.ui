import { map } from 'lodash';

export class User {
  public isAuth: boolean = false;
  public isLoading: boolean = false;
  public token: string;
  public username: string;
  public email: string;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
