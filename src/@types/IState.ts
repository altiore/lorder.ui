import { FormStateMap } from 'redux-form';

import { DownloadList } from '#/@store/@common/entities';
import { IDialogState } from '#/@store/dialog';
import { Feedback } from '#/@store/feedback';
import { IIdentityState } from '#/@store/identity';
import { IInfo } from '#/@store/info';
import { Project } from '#/@store/projects';
import { Statistics } from '#/@store/statistics';
import { TaskType } from '#/@store/task-types';
import { Task } from '#/@store/tasks';
import { Timer } from '#/@store/timer';
import { IUiState } from '#/@store/ui';
import { VersionHistory } from '#/@store/versionHistory';

import { IRouteState } from './IRouteState';
import { ITasksFilter } from './ITasksFilter';
import { IUser } from './IUser';

import {
  IDownloadList,
  IExternalLibraries,
  IOther,
  IPublicProject,
  ISelectedProject,
  ISockets,
  IStatusMove,
  ITaskActive,
  ITaskStatus,
  IUserRole,
  IUserWork,
} from '@types';

export interface IState {
  asyncReducers: { list: string[] };
  counter: any;
  dialog: IDialogState;
  externalLibraries: IExternalLibraries;
  feedback: DownloadList<Feedback>;
  form: FormStateMap;
  highcharts: any;
  identity: IIdentityState;
  info: IInfo;
  notifications: any;
  other: IOther;
  project: ISelectedProject;
  projects: DownloadList<Project>;
  publicAltiore: IPublicProject;
  publicProject: IPublicProject;
  roles: IDownloadList<IUserRole>;
  sockets: ISockets;
  statistics: Statistics;
  projectStatusMoves: IDownloadList<IStatusMove>;
  taskActive: ITaskActive;
  taskStatuses: IDownloadList<ITaskStatus>;
  taskTypes: DownloadList<TaskType>;
  tasks: DownloadList<Task>;
  tasksFilter: ITasksFilter;
  timer: Timer;
  router: IRouteState;
  ui: IUiState;
  userWorks: IDownloadList<IUserWork>;
  versionHistory: VersionHistory;
  intl: any;
  webHooks: IDownloadList<any>;

  authorized: {
    users: DownloadList<IUser>;
  };
}
