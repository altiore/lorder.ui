import map from 'lodash-es/map';

export interface IUserTask {
  id?: number | string;
  description?: string;
  finishAt?: string;
  source?: string;
  startAt?: string;
  // task
  // user
  value?: number;
}

export class UserTask implements IUserTask {
  public id?: number | string;
  public description?: string;
  public finishAt?: string;
  public source?: string;
  public startAt?: string;
  // task
  // user
  public value?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
