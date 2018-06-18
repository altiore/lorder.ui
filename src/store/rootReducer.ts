import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { user, User } from './user';

export interface IState {
  form: any,
  user: User,
}

export const rootReducer = combineReducers({
  form,
  user,
});