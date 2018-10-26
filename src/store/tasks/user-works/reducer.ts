import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

import { DownloadList } from 'src/store/@common/entities';
import { IRequestAction } from 'src/store/@common/requestActions';
import { deleteUserWork, patchAndStopUserWork, postAndStartUserWork } from './actions';
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
  return state.stopLoading().updateItem(0, payload && payload.data);
};

const postAndStartUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const patchAndStopUserWorkHandler = (state: S) => {
  return state.startLoading();
};

const patchAndStopUserWorkSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.stopLoading().updateItem(0, payload && payload.data);
};

const patchAndStopUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
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

    [patchAndStopUserWork.toString()]: patchAndStopUserWorkHandler,
    [patchAndStopUserWork.success]: patchAndStopUserWorkSuccessHandler,
    [patchAndStopUserWork.fail]: patchAndStopUserWorkFailHandler,

    [deleteUserWork.toString()]: deleteUserWorkHandler,
  },
  new DownloadList(UserWork)
);
