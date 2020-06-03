import get from 'lodash/get';
import pick from 'lodash/pick';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { getAuthActivate, logInPatch, refreshToken, setIsLoading, updateProfile } from './actions';
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

const updateProfileHandler = (state: IIdentityState) => {
  return new Identity({
    ...state,
    isLoading: true,
  });
};

const updateProfileSuccess = (state: IIdentityState, { payload }) => {
  return new Identity({
    ...state,
    isLoading: false,
    ...pick(payload.data, ['displayName', 'tel']),
  });
};

const updateProfileFail = (state: IIdentityState) => {
  return new Identity({
    ...state,
    isLoading: false,
  });
};

const refreshTokenHandler = (state: IIdentityState) => {
  return new Identity({
    ...state,
    isRefreshing: true,
  });
};

const refreshTokenSuccessHandler = (state: IIdentityState, { payload }) => {
  return new Identity({
    ...state,
    isRefreshing: false,
    ...payload.data,
  });
};

const refreshTokenFailHandler = (state: IIdentityState, { payload }) => {
  return new Identity();
};

export const identity = handleActions<IIdentityState>(
  {
    [getAuthActivate.toString()]: getAuthActivateHandler,
    [getAuthActivate.success]: getAuthActivateSuccessHandler,

    [logInPatch.toString()]: handleLogIn,
    [logInPatch.success]: logInPatchSuccessHandler,
    [logInPatch.fail]: logInPatchFailHandler,

    [updateProfile.toString()]: updateProfileHandler,
    [updateProfile.success]: updateProfileSuccess,
    [updateProfile.fail]: updateProfileFail,

    [setIsLoading.toString()]: setIsLoadingHandler,

    [refreshToken.toString()]: refreshTokenHandler,
    [refreshToken.success]: refreshTokenSuccessHandler,
    [refreshToken.fail]: refreshTokenFailHandler,

    [PURGE]: logOutHandler,
  },
  new Identity()
);
