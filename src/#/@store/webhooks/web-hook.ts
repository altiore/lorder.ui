import map from 'lodash/map';
import { Moment } from 'moment';

export class WebHook {
  readonly id: number;
  readonly data: object;
  readonly createdAt: Moment;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
