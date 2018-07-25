import * as localForage from 'localforage';
import { NotificationsState, reducer as notifications } from 'react-notification-system-redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';

import { DownloadList } from './@common/entities';
import { identity, IIdentityState } from './identity';
import { Project, projects } from './projects'
import { IUiState, uiReducer } from './ui';
import { User, users } from './users';

export interface IState {
  form: FormStateMap;
  identity: IIdentityState;
  notifications: NotificationsState;
  projects: DownloadList<Project>;
  router: RouterState;
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
  blacklist: ['form'],
  key: 'altiore',
  storage: localForage,
};

export const rootReducer = persistReducer(persistConfig, combineReducers<IState>({
  form,
  identity,
  notifications,
  projects,
  router: routerReducer,
  ui: uiReducer,
  users,
}));