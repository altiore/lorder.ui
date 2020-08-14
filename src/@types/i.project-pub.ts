export interface IStatisticMetric {
  count: number;
  days: number;
  membersCount: number;
  months: number;
  timeProductivity: number;
  timeSumIn8hoursDays: number;
  value: number;
}

export interface IProjectPub {
  uuid: string;
  projectId: number;
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
