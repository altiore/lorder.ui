import get from 'lodash/get';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { getAuthActivate, logInPatch, setIsLoading } from './actions';
import { Identity, IIdentityState } from './Identity';

const getAuthActivateHandler = (state: IIdentityState) => {
  return new Identity({
    ...state,
    isLoading: true,
  });
};

const logInPatchSuccessHandler = (state: IIdentityState, { payload, meta }: any): IIdentityState => {
  return new Identity({
    ...state,
    ...payload.data,
    isAuth: true,
    isLoading: false,
  });
};

const logInPatchFailHandler = (): IIdentityState => {
  return new Identity();
};

const getAuthActivateSuccessHandler = (state: IIdentityState, { payload, meta }: any): IIdentityState => {
  return new Identity({
    ...state,
    ...payload.data,
    isAuth: true,
  });
};

const handleLogIn = (state: IIdentityState, { payload }: Action<any>): IIdentityState => {
  return new Identity({
    ...state,
    email: get(payload, 'request.data.email'),
    isLoading: true,
  });
};

const setIsLoadingHandler = (state: IIdentityState, { payload = true }: Action<any>) => {
  return new Identity({
    ...state,
    isLoading: payload,
  });
};

const logOutHandler = (state: IIdentityState): IIdentityState => {
  return new Identity({
    isLoading: state.isLoading,
  });
};

export const identity = handleActions<IIdentityState, any, any>(
  {
    [getAuthActivate.toString()]: getAuthActivateHandler,
    [getAuthActivate.success]: getAuthActivateSuccessHandler,

    [logInPatch.toString()]: handleLogIn,
    [logInPatch.success]: logInPatchSuccessHandler,
    [logInPatch.fail]: logInPatchFailHandler,

    [setIsLoading.toString()]: setIsLoadingHandler,

    [PURGE]: logOutHandler,
  },
  new Identity()
);
