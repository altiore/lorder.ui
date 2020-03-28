import map from 'lodash/map';

import moment from 'moment';

import { IOther } from '@types';

export class Other implements IOther {
  cashResetAt: moment.Moment;

  constructor(initial?: Partial<IOther>) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
