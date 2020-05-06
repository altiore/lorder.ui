import map from 'lodash/map';

import { IExternalLibraries } from '@types';

export class ExternalLibraries implements IExternalLibraries {
  readonly init: boolean = false;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
