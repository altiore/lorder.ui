import map from 'lodash-es/map';

import { config } from 'src/config';

export class VersionHistory {
  readonly version: string = config.VERSION;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
