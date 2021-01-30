import { IProjectShort } from './i.project';

export interface IStatisticMetric {
  count: number;
  days: number;
  membersCount: number;
  months: number;
  timeProductivity: number;
  timeSumIn8hoursDays: number;
  value: number;
}

export interface IProjectStatistic {
  uuid: string;
  projectId: number;
  project: IProjectShort;
  domain?: string;
  title: string;
  isOpen: boolean;
  statistic: {
    metrics?: {
      all: IStatisticMetric;
      lastWeek: IStatisticMetric;
      lastMonth: IStatisticMetric;
    };
  };
}
