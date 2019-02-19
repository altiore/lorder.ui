import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { DownloadList } from 'src/store/@common/entities';
import { UserWork } from 'src/store/tasks';
import { getUserWorks, patchUserWork } from './actions';

type S = DownloadList<UserWork>;
type P<T = any> = AxiosResponse<T>;

const getUserWorksHandler = (state: S) => {
  return state.startLoading();
};

const getUserWorksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload);
};

const getUserWorksFailHandler = (state: S) => {
  return state.stopLoading();
};

const patchUserWorkHandler = (state: S, { payload }: any) => {
  return state.startLoading();
};

const patchUserWorkSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  console.log('patchUserWorkSuccessHandler', payload);
  return state.stopLoading();
};

const patchUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const logOutHandler = () => {
  return new DownloadList(UserWork);
};

export const userWorks = handleActions<S, P>(
  {
    [getUserWorks.toString()]: getUserWorksHandler,
    [getUserWorks.success]: getUserWorksSuccessHandler,
    [getUserWorks.fail]: getUserWorksFailHandler,

    [patchUserWork.toString()]: patchUserWorkHandler,
    [patchUserWork.success]: patchUserWorkSuccessHandler,
    [patchUserWork.fail]: patchUserWorkFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(UserWork)
);
