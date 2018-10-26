import { NotificationsState } from 'react-notification-system-redux';
import { RouterState } from 'react-router-redux';
import { FormStateMap } from 'redux-form';

import { DownloadList } from 'src/store/@common/entities';
import { IDialogState } from 'src/store/dialog';
import { IIdentityState } from 'src/store/identity';
import { Project } from 'src/store/projects';
import { TaskType } from 'src/store/task-types';
import { Task } from 'src/store/tasks';
import { ITimer } from 'src/store/timer';
import { IUiState } from 'src/store/ui';
import { IUser } from 'src/store/users';

export interface IState {
  dialog: IDialogState;
  form: FormStateMap;
  identity: IIdentityState;
  notifications: NotificationsState;
  project: { selected?: number };
  projects: DownloadList<Project>;
  taskTypes: DownloadList<TaskType>;
  tasks: DownloadList<Task>;
  timer: ITimer;
  router: RouterState;
  ui: IUiState;
  users: DownloadList<IUser>;
}
