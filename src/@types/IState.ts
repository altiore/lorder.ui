import { NotificationsState } from 'react-notification-system-redux';
import { RouterState } from 'react-router-redux';
import { FormStateMap } from 'redux-form';

import { DownloadList } from 'src/store/@common/entities';
import { IDialogState } from 'src/store/dialog';
import { IIdentityState } from 'src/store/identity';
import { Project } from 'src/store/projects';
import { TaskType } from 'src/store/task-types';
import { IUiState } from 'src/store/ui';
import { IUserTask } from 'src/store/user-tasks/UserTask';
import { IUser } from 'src/store/users';

export interface IState {
  dialog: IDialogState;
  form: FormStateMap;
  identity: IIdentityState;
  notifications: NotificationsState;
  project: { selected?: number };
  projects: DownloadList<Project>;
  taskTypes: DownloadList<TaskType>;
  router: RouterState;
  ui: IUiState;
  userTasks: DownloadList<IUserTask>;
  users: DownloadList<IUser>;
}
