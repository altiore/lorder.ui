import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, combineActions, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

import { DownloadList } from 'src/store/@common/entities';
import { IRequestAction } from 'src/store/@common/requestActions';
import { deleteUserWork, patchAndStopUserWork, patchUserWork, postAndStartUserWork } from './actions';
import { UserWork } from './UserWork';

type S = DownloadList<UserWork>;
type StartUserWorkReq = IRequestAction<Partial<UserWork>>;
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
  const data: Partial<UserWork> = payload.data;
  const index = state.list.findIndex(el => el.id === data.id);
  if (!~index) {
    throw new Error(`Не смог найти измененную задачу index= ${index}`);
  }
  return state.stopLoading().updateItem(index, data);
};

const patchUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const patchAndStopUserWorkSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  if (!payload) {
    throw new Error('patchUserWorkSuccessHandler Error: payload required!');
  }
  const previousData: Partial<UserWork> = payload.data.previous;
  const previousIndex = state.list.findIndex(el => el.id === previousData.id);
  if (!~previousIndex) {
    throw new Error(`Не смог найти предыдущую задачу index= ${previousIndex}`);
  }
  const nextData: Partial<UserWork> = payload.data.next;
  return state
    .stopLoading()
    .updateItem(previousIndex, previousData)
    .addItem(nextData);
};

const deleteUserWorkHandler = (state: S, { payload }: Action<IDeleteUserWork>) => {
  const index = state.list.findIndex(el => el.id === get(payload, 'userWorkId'));
  return state.removeItem(index);
};

export const userWorks = handleActions<S, P>(
  {
    [postAndStartUserWork.toString()]: postAndStartUserWorkHandler,
    [postAndStartUserWork.success]: postAndStartUserWorkSuccessHandler,
    [postAndStartUserWork.fail]: postAndStartUserWorkFailHandler,

    [combineActions(patchAndStopUserWork, patchUserWork).toString()]: patchUserWorkHandler,
    [combineActions(patchAndStopUserWork.fail, patchUserWork.fail).toString()]: patchUserWorkFailHandler,
    [patchUserWork.success]: patchUserWorkSuccessHandler,
    [patchAndStopUserWork.success]: patchAndStopUserWorkSuccessHandler,

    [deleteUserWork.toString()]: deleteUserWorkHandler,
  },
  new DownloadList(UserWork)
);
