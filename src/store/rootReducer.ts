import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers } from 'redux';
import { FormStateMap, reducer as form } from 'redux-form';

import { IUserState, user } from './user';

export interface IState {
  form: FormStateMap;
  router: RouterState;
  user: IUserState;
}

export const rootReducer = combineReducers<IState>({
  form,
  router: routerReducer,
  user,
});