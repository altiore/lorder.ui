import { IProject } from './i.project';

export interface IPublicProject {
  uuid: string;
  title: string;
  projectId: number;
  monthlyBudget?: number;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;
  project?: IProject;
  statistic?: object;

  // added by UI
  isLoading: boolean;
  isLoaded: boolean;
}
