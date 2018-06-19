import { NotificationsState, reducer as notifications } from 'react-notification-system-redux';
import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';

import { IUserState, user } from './user';

export interface IState {
  form: FormStateMap;
  notifications: NotificationsState,
  router: RouterState;
  user: IUserState;
}

export const rootReducer = combineReducers<IState>({
  form,
  notifications,
  router: routerReducer,
  user,
});