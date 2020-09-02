import { ACCESS_LEVEL } from './access-level';
import { IDownloadList } from './i.download-list';
import { IMedia } from './i.media';
import { IMember } from './i.member';
import { IProjectRole } from './i.project-role';
import { IRoleColumn } from './i.project-strategy-info';
import { PROJECT_TYPE } from './project-type';

export enum PROJECT_STRATEGY {
  ADVANCED = 'ADVANCED',
  SIMPLE = 'SIMPLE',
  DOUBLE_CHECK = 'DOUBLE_CHECK',
}

export interface IProjectShort {
  id?: number;
  monthlyBudget?: number;
  logo?: IMedia;
  viewColor: PROJECT_COLOR;
  viewType: PROJECT_VIEW_TYPE;
}

export enum PROJECT_COLOR {
  BLACK = 'black',
  BLUE = 'blue',
  GREEN = 'green',
  VIOLET = 'violet',
}

export enum PROJECT_VIEW_TYPE {
  MEDAL = 'medal',
  TRIANGLE = 'triangle',
}

export interface IProject extends IProjectShort {
  uuid?: string;
  accessLevel?: ACCESS_LEVEL;
  title: string;
  desc?: string;
  slogan?: string;
  strategy: PROJECT_STRATEGY;
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

  taskColumns: IRoleColumn[];

  // calculated fields
  fullProjectTimeHumanize: string | undefined;
  shareTime: string;
  shortName: string;
  memberRole: string;
  shareValue: number;
}
