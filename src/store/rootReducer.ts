import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { user, User } from './user';

export interface IState {
  user: User,
}

export const rootReducer = combineReducers({
  form,
  user,
});