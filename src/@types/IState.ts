import { NotificationsState } from 'react-notification-system-redux';
import { RouterState } from 'react-router-redux';
import { FormStateMap } from 'redux-form';

import { DownloadList } from 'src/store/@common/entities';
import { IDialogState } from 'src/store/dialog';
import { IIdentityState } from 'src/store/identity';
import { Project } from 'src/store/projects';
import { PublicProject } from 'src/store/publicProject';
import { TaskType } from 'src/store/task-types';
import { Task, UserWork } from 'src/store/tasks';
import { Timer } from 'src/store/timer';
import { IUiState } from 'src/store/ui';
import { IUser } from 'src/store/users';
import { VersionHistory } from 'src/store/versionHistory';

export interface IState {
  dialog: IDialogState;
  form: FormStateMap;
  identity: IIdentityState;
  notifications: NotificationsState;
  project: { selected?: number };
  projects: DownloadList<Project>;
  publicProject: PublicProject;
  taskTypes: DownloadList<TaskType>;
  tasks: DownloadList<Task>;
  tasksFilter: { filter: 'smart' | 'recent' | 'new' };
  timer: Timer;
  router: RouterState;
  ui: IUiState;
  users: DownloadList<IUser>;
  userWorks: DownloadList<UserWork>;
  versionHistory: VersionHistory;
}
