import get from 'lodash/get';
import { Action, combineActions, handleActions } from 'redux-actions';

import { DownloadList } from '#/@store/@common/entities';
import { IRequestAction } from '#/@store/@common/requestActions';
import { patchUserWork } from '#/@store/user-works/actions';

import { AxiosResponse } from 'axios';
import uniqid from 'uniqid';

import { deleteUserWork, patchAndStopUserWork, postAndStartUserWork } from './actions';
import { UserWork } from './UserWork';

import { IDownloadList, IUserWork } from '@types';

type S = IDownloadList<IUserWork>;
type StartUserWorkReq = IRequestAction<Partial<IUserWork>>;
interface IDeleteUserWork {
  taskId: number;
}
type P<T = any> = IDeleteUserWork | StartUserWorkReq | AxiosResponse<T> | Partial<UserWork>;

const postAndStartUserWorkHandler = (state: S, { payload }: Action<StartUserWorkReq>) => {
  const description = get(payload, 'request.data.description');
  const projectId = get(payload, 'request.data.projectId');
  return state.startLoading().addItem({
    description,
    id: uniqid(),
    projectId,
  });
};

const postAndStartUserWorkSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  if (!payload) {
    throw new Error('postAndStartUserWorkSuccessHandler Error: payload is required');
  }
  return state.stopLoading().updateItem(0, payload.data.started);
};

const postAndStartUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const patchUserWorkHandler = (state: S) => {
  return state.startLoading();
};

const patchUserWorkSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  if (!payload) {
    throw new Error('patchUserWorkSuccessHandler Error: payload required!');
  }
  const data: Partial<UserWork> = payload.data.edited;
  const index = state.list.findIndex(el => el.id === data.id);
  if (!~index) {
    throw new Error(`Не смог найти измененную задачу index= ${index}`);
  }
  return state.stopLoading().updateItem(index, data);
};

const patchUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const deleteUserWorkHandler = (state: S, { payload }: Action<IDeleteUserWork>) => {
  const index = state.list.findIndex(el => el.id === get(payload, 'userWorkId'));
  return state.removeItem(index);
};

const updateHandler = (state: S, { payload }: Action<UserWork>) => {
  if (!payload) {
    throw new Error('Payload is required');
  }
  const i = state.list.findIndex(el => el.id === payload.id);
  if (~i) {
    return state.updateItem(i, payload).stopLoading();
  } else {
    return state.addItem(payload);
  }
};

export const userWorks = handleActions<S, any, any>(
  {
    [postAndStartUserWork.toString()]: postAndStartUserWorkHandler,
    [postAndStartUserWork.success]: postAndStartUserWorkSuccessHandler,
    [postAndStartUserWork.fail]: postAndStartUserWorkFailHandler,

    [combineActions(patchAndStopUserWork.toString(), patchUserWork.toString()) as any]: patchUserWorkHandler,
    [combineActions(patchAndStopUserWork.fail, patchUserWork.fail) as any]: patchUserWorkFailHandler,
    [patchUserWork.success]: patchUserWorkSuccessHandler,

    [deleteUserWork.toString()]: deleteUserWorkHandler,

    update: updateHandler,
  },
  new DownloadList(UserWork)
);
