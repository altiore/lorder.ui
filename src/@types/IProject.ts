import { ACCESS_LEVEL } from './ACCESS_LEVEL';
import { IDownloadList } from './IDownloadList';
import { IMember } from './IMember';
import { TASK_STATUS_MOVE_TYPE } from './IStatusMove';
import { PROJECT_TYPE } from './PROJECT_TYPE';

export enum PROJECT_STRATEGY {
  ADVANCED = 'ADVANCED',
  SIMPLE = 'SIMPLE',
  DOUBLE_CHECK = 'DOUBLE_CHECK',
}

export interface ITaskMove {
  id: number;
  title: string;
  type: TASK_STATUS_MOVE_TYPE;

  projectRoleId: number;
  fromId: number;
  toId: number;
}

export interface ITaskColumn {
  id: number;
  name: string;

  moves: ITaskMove[];

  statusFrom: number;
  statusTo: number;
}

export interface IProject {
  id?: number;
  uuid?: string;
  accessLevel?: ACCESS_LEVEL;
  title: string;
  desc?: string;
  slogan?: string;
  strategy: PROJECT_STRATEGY;
  monthlyBudget?: number;
  owner?: any;
  ownerId?: number;
  phases?: any[];
  members: IDownloadList<IMember>;
  tasks: any;
  projectTaskTypes: any;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;
  type: PROJECT_TYPE;

  taskColumns: ITaskColumn[];

  // calculated fields
  fullProjectTimeHumanize: string | undefined;
  shareTime: string;
  shortName: string;
  shareValue: number;
}
