import * as localForage from 'localforage';
import { NotificationsState, reducer as notifications } from 'react-notification-system-redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';

import { IUiState, uiReducer } from './ui';
import { IUserState, user } from './user';

export interface IState {
  form: FormStateMap;
  notifications: NotificationsState,
  router: RouterState;
  ui: IUiState;
  user: IUserState;
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
  notifications,
  router: routerReducer,
  ui: uiReducer,
  user,
}));