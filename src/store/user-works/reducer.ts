import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

// import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { IRequestAction } from '../@common/requestActions';
import { deleteUserWork, getAllUserWorks, patchAndStopUserWork, postAndStartUserWork } from './actions';
import { UserWork } from './UserWork';

type S = DownloadList<UserWork>;
type StartUserWorkReq = IRequestAction<Partial<UserWork>>;
interface IDeleteUserWork {
  taskId: number;
}
type P<T = any> = IDeleteUserWork | StartUserWorkReq | AxiosResponse<T> | Partial<UserWork>;
// type M = IMeta<{ projectId: number; taskId?: number }>;

const getAllUserWorksHandler = (state: S) => {
  return state.startLoading();
};

const getAllUserWorksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload);
};

const getAllUserWorksFailHandler = (state: S) => {
  return state.stopLoading();
};

const postAndStartUserWorkHandler = (state: S, { payload }: Action<StartUserWorkReq>) => {
  const description = get(payload, 'request.data.title');
  const projectId = get(payload, 'projectId');
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
  const index = state.list.findIndex(el => el.id === get(payload, 'taskId'));
  return state.removeItem(index);
};

export const userWorks = handleActions<S, P>(
  {
    [getAllUserWorks.toString()]: getAllUserWorksHandler,
    [getAllUserWorks.success]: getAllUserWorksSuccessHandler,
    [getAllUserWorks.fail]: getAllUserWorksFailHandler,

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
