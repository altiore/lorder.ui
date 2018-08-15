import * as localForage from 'localforage';
import { NotificationsState, reducer as notifications } from 'react-notification-system-redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';

import { DownloadList } from './@common/entities';
import { dialog, IDialogState } from './dialog';
import { identity, IIdentityState } from './identity';
import { Project, projects } from './projects'
import { TaskType, taskTypes } from './taskTypes';
import { IUiState, uiReducer } from './ui';
import { User, users } from './users';

export interface IState {
  dialog: IDialogState,
  form: FormStateMap;
  identity: IIdentityState;
  notifications: NotificationsState;
  projects: DownloadList<Project>;
  router: RouterState;
  taskTypes: DownloadList<TaskType>;
  ui: IUiState;
  users: DownloadList<User>;
}

localForage.config({
  description : 'Altiore contribution version 1.0',
  name        : 'altiore',
  storeName   : 'contribution',
  version     : 1.0,
});

const persistConfig = {
  blacklist: ['dialog', 'form'],
  key: 'altiore',
  storage: localForage,
};

export const rootReducer = persistReducer(persistConfig, combineReducers<IState>({
  dialog,
  form,
  identity,
  notifications,
  projects,
  router: routerReducer,
  taskTypes,
  ui: uiReducer,
  users,
}));