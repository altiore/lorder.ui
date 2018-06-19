import { handleActions } from 'redux-actions';

import { getAuthActivate, logIn } from './actions';
import { IUserState, User } from './User';

const getAuthActivateHandler = (state: IUserState) => {
  state.isLoading = true;
  return state;
};

const getAuthActivateSuccessHandler = (state: IUserState, { payload }: any): IUserState => {
  const newUser = new User({
    ...state,
    ...payload,
    isAuth: true,
    isLoading: false,
    role: 'user',
  });
  return newUser;
};

const getAuthActivateFailHandler = (state: IUserState) => {
  state.isLoading = false;
  return state;
};

const handleLogIn = (state: IUserState): IUserState => {
  return state;
};

export const user = handleActions<IUserState, any, any>(
  {
    [getAuthActivate.toString()]: getAuthActivateHandler,
    [getAuthActivate.success]: getAuthActivateSuccessHandler,
    [getAuthActivate.fail]: getAuthActivateFailHandler,
    [logIn.toString()]: handleLogIn,
  },
  new User()
);
