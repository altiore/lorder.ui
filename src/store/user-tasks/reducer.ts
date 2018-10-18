import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

// import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { IRequestAction } from '../@common/requestActions';
import { deleteUserTask, getAllUserTasks, patchAndStopUserTask, postAndStartUserTask } from './actions';
import { UserTask } from './UserTask';

type S = DownloadList<UserTask>;
type StartUserTaskReq = IRequestAction<Partial<UserTask>>;
interface IDeleteUserTask {
  taskId: number;
}
type P<T = any> = IDeleteUserTask | StartUserTaskReq | AxiosResponse<T> | Partial<UserTask>;
// type M = IMeta<{ projectId: number; taskId?: number }>;

const getAllUserTasksHandler = (state: S) => {
  return state.startLoading();
};

const getAllUserTasksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload);
};

const getAllUserTasksFailHandler = (state: S) => {
  return state.stopLoading();
};

const postAndStartUserTaskHandler = (state: S, { payload }: Action<StartUserTaskReq>) => {
  const description = get(payload, 'request.data.title');
  const projectId = get(payload, 'projectId');
  return state.startLoading().addItem({
    description,
    id: uniqid(),
    projectId,
  });
};

const postAndStartUserTaskSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.stopLoading().updateItem(0, payload && payload.data);
};

const postAndStartUserTaskFailHandler = (state: S) => {
  return state.stopLoading();
};

const patchAndStopUserTaskHandler = (state: S) => {
  return state.startLoading();
};

const patchAndStopUserTaskSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.stopLoading().updateItem(0, payload && payload.data);
};

const patchAndStopUserTaskFailHandler = (state: S) => {
  return state.stopLoading();
};

const deleteUserTaskHandler = (state: S, { payload }: Action<IDeleteUserTask>) => {
  const index = state.list.findIndex(el => el.id === get(payload, 'taskId'));
  return state.removeItem(index);
};

export const userTasks = handleActions<S, P>(
  {
    [getAllUserTasks.toString()]: getAllUserTasksHandler,
    [getAllUserTasks.success]: getAllUserTasksSuccessHandler,
    [getAllUserTasks.fail]: getAllUserTasksFailHandler,

    [postAndStartUserTask.toString()]: postAndStartUserTaskHandler,
    [postAndStartUserTask.success]: postAndStartUserTaskSuccessHandler,
    [postAndStartUserTask.fail]: postAndStartUserTaskFailHandler,

    [patchAndStopUserTask.toString()]: patchAndStopUserTaskHandler,
    [patchAndStopUserTask.success]: patchAndStopUserTaskSuccessHandler,
    [patchAndStopUserTask.fail]: patchAndStopUserTaskFailHandler,

    [deleteUserTask.toString()]: deleteUserTaskHandler,
  },
  new DownloadList(UserTask)
);
