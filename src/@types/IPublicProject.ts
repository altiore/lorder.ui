import { IProjectMember } from './IProjectMember';

export interface IProjectStatistic {
  members: IProjectMember[];
  data: { [key in any]: { time: number; value: number } };
}

export interface IPublicProject {
  uuid: string;
  isLoading: boolean;
  isLoaded: boolean;
  title: string;
  projectId: number;
  monthlyBudget?: number;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;
  statistic?: IProjectStatistic;
}
