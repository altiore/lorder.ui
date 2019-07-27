import map from 'lodash/map';

import { IStatistics } from '@types';

export class Statistics implements IStatistics {
  readonly activity: number = 0;
  readonly activeUsersCount: number = 0;
  readonly activeProjectsCount: number = 0;
  readonly publicProjectsCount: number = 0;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
