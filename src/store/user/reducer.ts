import { handleActions } from 'redux-actions';

import { loginUser } from './actions';
import { User } from './User';

const hanldeLoginUser = (state: {}) => {
  return state;
};

export default handleActions(
  {
    [loginUser.toString()]: hanldeLoginUser,
  },
  new User()
)
