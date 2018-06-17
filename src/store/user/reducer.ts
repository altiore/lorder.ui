import { handleActions } from 'redux-actions';

import { logIn } from './actions';
import { User } from './User';

const handleLogIn = (state: {}) => {
  return state;
};

export const user = handleActions(
  {
    [logIn.toString()]: handleLogIn,
  },
  new User()
)
