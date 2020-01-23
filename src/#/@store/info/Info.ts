import map from 'lodash/map';

export interface IInfo {
  activity: number;
  people: string;
  projects: string;
}

export class Info implements IInfo {
  readonly activity: number = 0.23;
  readonly people: string = '78';
  readonly projects: string = '38';

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
