import { TASK_STATUS_MOVE_TYPE } from './i.status-move';

export enum STATUS_NAME {
  architect_review = 'architect_review',
  assigning_performer = 'assigning_performer',
  assigning_responsible = 'assigning_responsible',
  'back-log' = 'back-log',
  checking = 'checking',
  'code-review' = 'code-review',
  creating = 'creating',
  deployed_architect_estimation = 'deployed_architect_estimation',
  deployed_community_estimation = 'deployed_community_estimation',
  deployed_prof_estimation = 'deployed_prof_estimation',
  developing = 'developing',
  done = 'done',
  estimating_before_PERFORMER = 'estimating_before_PERFORMER',
  estimation_before_assigning = 'estimation_before_assigning',
  estimation_before_to_do = 'estimation_before_to_do',
  finishing = 'finishing',
  'in-progress' = 'in-progress',
  in_progress = 'in_progress',
  'post-estimation' = 'post-estimation',
  preparing = 'preparing',
  prof_review = 'prof_review',
  publishing = 'publishing',
  ready_to_deploy = 'ready_to_deploy',
  ready_to_do = 'ready_to_do',
  reviewing = 'reviewing',
  testing = 'testing',
  'to-do' = 'to-do',
}

export interface IRoleMove {
  from: string;
  type: TASK_STATUS_MOVE_TYPE;
  to: string;
  requirements?: {
    fields?: string[];
    transit?: true;
  };
}

export interface IRoleColumn {
  column: STATUS_NAME;
  statuses: STATUS_NAME[];
  moves: IRoleMove[];
}

export interface IDetailedRole {
  id: string;
  title: string;
  order: number;
  createdStatus: string;
  columns: IRoleColumn[];
}

export interface IProjectStrategyInfo {
  strategy: string;
  userRoles: IDetailedRole[];
}
