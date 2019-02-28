import { RouterState } from 'connected-react-router';
import { NotificationsState } from 'react-notification-system-redux';
import { FormStateMap } from 'redux-form';

import { DownloadList } from 'src/store/@common/entities';
import { IDialogState } from 'src/store/dialog';
import { Feedback } from 'src/store/feedback';
import { IIdentityState } from 'src/store/identity';
import { Project } from 'src/store/projects';
import { PublicProject } from 'src/store/publicProject';
import { TaskType } from 'src/store/task-types';
import { Task, UserWork } from 'src/store/tasks';
import { Timer } from 'src/store/timer';
import { IUiState } from 'src/store/ui';
import { VersionHistory } from 'src/store/versionHistory';
import { ITasksFilter } from './ITasksFilter';
import { IUser } from './IUser';

export interface IState {
  dialog: IDialogState;
  feedback: DownloadList<Feedback>;
  form: FormStateMap;
  identity: IIdentityState;
  notifications: NotificationsState;
  project: { selected?: number };
  projects: DownloadList<Project>;
  publicProject: PublicProject;
  taskTypes: DownloadList<TaskType>;
  tasks: DownloadList<Task>;
  tasksFilter: ITasksFilter;
  timer: Timer;
  router: RouterState;
  ui: IUiState;
  users: DownloadList<IUser>;
  userWorks: DownloadList<UserWork>;
  versionHistory: VersionHistory;
}
