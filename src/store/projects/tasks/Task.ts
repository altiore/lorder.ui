import map from 'lodash-es/map';

export interface ITask {
  id?: number;
  title: string;
  description: string;
  value: number;
}

export class Task implements ITask {
  public id?: number;
  public title: string;
  public description: string;
  public value: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
