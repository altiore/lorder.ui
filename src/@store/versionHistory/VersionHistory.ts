import map from 'lodash/map';

import { config } from '@config';

export class VersionHistory {
  readonly version: string = config.VERSION;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
