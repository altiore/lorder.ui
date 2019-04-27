import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { DownloadList } from 'store/@common/entities';
import { patchAndStopUserWork, postAndStartUserWork, UserWork } from 'store/tasks';
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
  let resState: S = state;
  const { edited, removed, touched } = get(payload, 'data');
  // 1. remove for removed
  removed.map((uw: UserWork) => {
    const index = resState.list.findIndex(el => el.id === uw.id);
    if (~index) {
      resState = resState.removeItem(index);
    }
  });
  // 2. update edited and touched
  [...touched, edited].map((uw: UserWork) => {
    const index = resState.list.findIndex(el => el.id === uw.id);
    if (~index) {
      resState = resState.updateItem(index, uw);
    }
  });
  return resState.stopLoading();
};

const patchUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const logOutHandler = () => {
  return new DownloadList(UserWork);
};

const patchAndStopUserWorkHandler = (state: S) => {
  return state.startLoading();
};

const patchAndStopUserWorkSuccessHandler = (state: S, { payload }: Action<P>) => {
  const { next, previous } = get(payload, 'data', {});
  let resState: S = state;
  const nextIndex = resState.list.findIndex(el => el.id === next.id);
  if (~nextIndex) {
    resState = resState.updateItem(nextIndex, next);
  } else {
    resState = resState.addItem(next);
  }
  const prevIndex = resState.list.findIndex(el => el.id === previous.id);
  if (~prevIndex) {
    resState = resState.updateItem(prevIndex, previous);
  }
  return resState.stopLoading();
};

const patchAndStopUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const postAndStartUserWorkHandler = (state: S) => {
  return state.startLoading();
};

const postAndStartUserWorkSuccessHandler = (state: S, { payload }: Action<P>) => {
  const { finished, started } = get(payload, ['data']);
  let resState: S = state;
  [...finished, started].map(uw => {
    const idx = resState.list.findIndex(el => el.id === uw.id);
    if (~idx) {
      resState = resState.updateItem(idx, uw);
    } else {
      resState = resState.addItem(uw);
    }
  });

  return resState.stopLoading();
};

const postAndStartUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

export const userWorks = handleActions<S, P>(
  {
    [getUserWorks.toString()]: getUserWorksHandler,
    [getUserWorks.success]: getUserWorksSuccessHandler,
    [getUserWorks.fail]: getUserWorksFailHandler,

    [patchUserWork.toString()]: patchUserWorkHandler,
    [patchUserWork.success]: patchUserWorkSuccessHandler,
    [patchUserWork.fail]: patchUserWorkFailHandler,

    [patchAndStopUserWork.toString()]: patchAndStopUserWorkHandler,
    [patchAndStopUserWork.success]: patchAndStopUserWorkSuccessHandler,
    [patchAndStopUserWork.fail]: patchAndStopUserWorkFailHandler,

    [postAndStartUserWork.toString()]: postAndStartUserWorkHandler,
    [postAndStartUserWork.success]: postAndStartUserWorkSuccessHandler,
    [postAndStartUserWork.fail]: postAndStartUserWorkFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(UserWork)
);
