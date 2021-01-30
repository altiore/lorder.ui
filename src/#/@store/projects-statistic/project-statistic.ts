import map from 'lodash/map';

import { IProjectShort, IProjectStatistic, IStatisticMetric } from '@types';

export class ProjectStatistic implements IProjectStatistic {
  uuid: string;
  projectId: number;
  domain?: string;
  title: string;
  isOpen: boolean;
  project: IProjectShort;
  statistic: {
    metrics?: {
      all: IStatisticMetric;
      lastWeek: IStatisticMetric;
      lastMonth: IStatisticMetric;
    };
  };

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
