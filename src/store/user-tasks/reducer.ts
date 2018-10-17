import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

import { DownloadList } from '../@common/entities';
import { IRequestAction } from '../@common/requestActions';
import { deleteUserTask, getAllUserTasks, postUserTask, tickUserTaskTimer } from './actions';
import { UserTask } from './UserTask';

type S = DownloadList<UserTask>;
type StartUserTaskReq = IRequestAction<Partial<UserTask>>;
interface IDeleteUserTask {
  taskId: number;
}
type P<T = any> = IDeleteUserTask | StartUserTaskReq | AxiosResponse<T>;

const getAllUserTasksHandler = (state: S) => {
  console.log('getAllUserTasksHandler -> state', state);
  return state;
};

const getAllUserTasksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload);
};

const postUserTaskHandler = (state: S, { payload }: Action<StartUserTaskReq>) => {
  console.log('startUserTaskHandler', payload);
  const description = get(payload, 'request.data.title');
  return state.startLoading().addItem({
    description,
    id: uniqid(),
  });
};

const deleteUserTaskHandler = (state: S, { payload }: Action<IDeleteUserTask>) => {
  const index = state.list.findIndex(el => el.id === get(payload, 'taskId'));
  return state.removeItem(index);
};

const tickUserTaskTimerHandler = (state: S) => {
  console.log('tickUserTaskTimerHandler.tick');
  return state;
};

export const userTasks = handleActions<S, P>(
  {
    [getAllUserTasks.toString()]: getAllUserTasksHandler,
    [getAllUserTasks.success]: getAllUserTasksSuccessHandler,
    [postUserTask.toString()]: postUserTaskHandler,
    [deleteUserTask.toString()]: deleteUserTaskHandler,
    [tickUserTaskTimer.toString()]: tickUserTaskTimerHandler,
  },
  new DownloadList(UserTask)
);
