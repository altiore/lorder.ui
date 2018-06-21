import { handleActions } from 'redux-actions';

import { getAuthActivate, logIn, logOut } from './actions';
import { IUserState, User } from './User';

const getAuthActivateHandler = (state: IUserState) => {
  state.isLoading = true;
  return state;
};

const getAuthActivateSuccessHandler = (state: IUserState, { payload }: any): IUserState => {
  const newUser = new User({
    ...state,
    ...payload.data,
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

const logOutHandler = (): IUserState => {
  return new User();
};

export const user = handleActions<IUserState, any, any>(
  {
    [getAuthActivate.toString()]: getAuthActivateHandler,
    [getAuthActivate.success]: getAuthActivateSuccessHandler,
    [getAuthActivate.fail]: getAuthActivateFailHandler,
    [logIn.toString()]: handleLogIn,
    [logOut.toString()]: logOutHandler,
  },
  new User()
);
