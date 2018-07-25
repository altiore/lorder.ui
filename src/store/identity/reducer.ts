import { handleActions } from 'redux-actions';

import { getAuthActivate, logIn, logOut } from './actions';
import { Identity, IIdentityState } from './Identity';

const getAuthActivateHandler = (state: IIdentityState) => {
  state.isLoading = true;
  return state;
};

const getAuthActivateSuccessHandler = (state: IIdentityState, { payload }: any): IIdentityState => {
  const newUser = new Identity({
    ...state,
    ...payload.data,
    isAuth: true,
    isLoading: false,
    role: 'super-admin',
  });
  return newUser;
};

const getAuthActivateFailHandler = (state: IIdentityState) => {
  state.isLoading = false;
  return state;
};

const handleLogIn = (state: IIdentityState): IIdentityState => {
  return state;
};

const logOutHandler = (): IIdentityState => {
  return new Identity();
};

export const identity = handleActions<IIdentityState, any, any>(
  {
    [getAuthActivate.toString()]: getAuthActivateHandler,
    [getAuthActivate.success]: getAuthActivateSuccessHandler,
    [getAuthActivate.fail]: getAuthActivateFailHandler,
    [logIn.toString()]: handleLogIn,
    [logOut.toString()]: logOutHandler,
  },
  new Identity()
);
