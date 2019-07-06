import { NotificationsState } from 'react-notification-system-redux';
import { FormStateMap } from 'redux-form';

import { DownloadList } from '@store/@common/entities';
import { IDialogState } from '@store/dialog';
import { Feedback } from '@store/feedback';
import { IIdentityState } from '@store/identity';
import { IInfo } from '@store/info';
import { Project } from '@store/projects';
import { PublicProject } from '@store/publicProject';
import { TaskType } from '@store/task-types';
import { Task, UserWork } from '@store/tasks';
import { Timer } from '@store/timer';
import { IUiState } from '@store/ui';
import { VersionHistory } from '@store/versionHistory';
import { IRouteState } from './IRouteState';
import { ITasksFilter } from './ITasksFilter';
import { IUser } from './IUser';

export interface IState {
  dialog: IDialogState;
  feedback: DownloadList<Feedback>;
  form: FormStateMap;
  identity: IIdentityState;
  info: IInfo;
  notifications: NotificationsState;
  project: { selected?: number };
  projects: DownloadList<Project>;
  publicProject: PublicProject;
  taskTypes: DownloadList<TaskType>;
  tasks: DownloadList<Task>;
  tasksFilter: ITasksFilter;
  timer: Timer;
  router: IRouteState;
  ui: IUiState;
  users: DownloadList<IUser>;
  userWorks: DownloadList<UserWork>;
  versionHistory: VersionHistory;
}
