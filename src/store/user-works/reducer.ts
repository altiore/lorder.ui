import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { DownloadList } from 'src/store/@common/entities';
import { UserWork } from 'src/store/tasks';
import { getUserWorks } from './actions';

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

const logOutHandler = () => {
  return new DownloadList(UserWork);
};

export const userWorks = handleActions<S, P>(
  {
    [getUserWorks.toString()]: getUserWorksHandler,
    [getUserWorks.success]: getUserWorksSuccessHandler,
    [getUserWorks.fail]: getUserWorksFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(UserWork)
);
