import { ACCESS_LEVEL } from './ACCESS_LEVEL';

export interface IProject {
  id?: number;
  uuid?: string;
  accessLevel?: ACCESS_LEVEL;
  title: string;
  monthlyBudget?: number;
  owner?: any;
  ownerId?: number;
  phases?: any[];
  members: any;
  tasks: any;
  taskTypes: any;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;

  // calculated fields
  fullProjectTimeHumanize: string | undefined;
  shareTime: string;
  shareValue: number;
}
