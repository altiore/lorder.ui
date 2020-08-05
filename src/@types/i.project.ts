import { ACCESS_LEVEL } from './access-level';
import { IDownloadList } from './i.download-list';
import { IMember } from './i.member';
import { IProjectRole } from './i.project-role';
import { TASK_STATUS_MOVE_TYPE } from './i.status-move';
import { PROJECT_TYPE } from './project-type';

export enum PROJECT_STRATEGY {
  ADVANCED = 'ADVANCED',
  SIMPLE = 'SIMPLE',
  DOUBLE_CHECK = 'DOUBLE_CHECK',
}

export interface ITaskMove {
  from: string;
  type: TASK_STATUS_MOVE_TYPE;
  to: string;
  requirements?: {
    fields?: string[];
    transit?: true;
  };
}

export interface ITaskColumn {
  column: string;

  moves: ITaskMove[];
  statuses: string[];
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
  roles?: IProjectRole[];
  members: IDownloadList<IMember>;
  tasks: any;
  projectTaskTypes: any;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;
  type: PROJECT_TYPE;
  pub?: any;

  taskColumns: ITaskColumn[];

  // calculated fields
  fullProjectTimeHumanize: string | undefined;
  shareTime: string;
  shortName: string;
  shareValue: number;
}
