import map from 'lodash/map';

import { ISockets } from '@types';

export class Sockets implements ISockets {
  readonly init: boolean = false;
  messages: string[] = [];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
