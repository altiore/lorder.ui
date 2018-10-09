import { combineActions, handleActions } from 'redux-actions';

import { getAuthActivate, logIn, logOut } from './actions';
import { Identity, IIdentityState } from './Identity';

const getAuthActivateHandler = (state: IIdentityState) => {
  state.isLoading = true;
  return state;
};

const getAuthActivateSuccessHandler = (state: IIdentityState, { payload, meta }: any): IIdentityState => {
  return new Identity({
    ...state,
    ...payload.data,
    isAuth: true,
    isLoading: false,
  });
};

const getAuthActivateFailHandler = (state: IIdentityState) => {
  state.isLoading = false;
  return state;
};

const handleLogIn = (state: IIdentityState): IIdentityState => {
  state.isLoading = true;
  return state;
};

const logOutHandler = (): IIdentityState => {
  return new Identity();
};

export const identity = handleActions<IIdentityState, any, any>(
  {
    [getAuthActivate.toString()]: getAuthActivateHandler,
    [combineActions(getAuthActivate.success, logIn.success) as any]: getAuthActivateSuccessHandler,
    [getAuthActivate.fail]: getAuthActivateFailHandler,
    [logIn.toString()]: handleLogIn,
    [logOut.toString()]: logOutHandler,
  },
  new Identity()
);
