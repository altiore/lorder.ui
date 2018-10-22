import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

import { DownloadList } from 'src/store/@common/entities';
import { IRequestAction } from 'src/store/@common/requestActions';
import { User } from 'src/store/users';
import { deleteProjectTask, patchProjectTask, postProjectTask } from './actions';
import { Task } from './Task';

type S = DownloadList<Task>;
interface IProjectRequest extends IRequestAction<Partial<Task>> {
  taskId: number;
  projectId: number;
  users: User[];
}
type P = IProjectRequest | AxiosResponse;

const postProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  const data = payload && payload.request.data;
  return state.startLoading().addItem(new Task({ id: uniqid(), ...data }));
};

const postProjectTaskSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.stopLoading().updateItem(-1, payload && payload.data);
};

const postProjectTaskFailHandler = (state: S) => {
  return state.stopLoading().removeItem(-1);
};

const patchProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  if (!payload) {
    throw new Error('patchProjectTaskHandler Error: payload is required');
  }
  const preparedData: Partial<Task> = { ...payload.request.data };
  if (preparedData.users) {
    preparedData.users = payload.users;
  }
  const taskIndex = state.list.findIndex(el => get(payload, 'taskId') === el.id);
  return state.startLoading().updateItem(taskIndex, preparedData);
};

const patchProjectTaskSuccessHandler = (state: S) => {
  return state.stopLoading();
};

const patchProjectTaskFailHandler = (state: S) => {
  console.log('not handled yet');
  return state.stopLoading();
};

const deleteProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  const taskIndex = state.list.findIndex(el => get(payload, 'taskId') === el.id);
  return state.startLoading().removeItem(taskIndex);
};

const deleteProjectTaskSuccessHandler = (state: S) => {
  return state.stopLoading();
};

const deleteProjectTaskFailHandler = (state: S) => {
  return state.stopLoading();
};

export const projectTasks = handleActions<S, P>(
  {
    [postProjectTask.toString()]: postProjectTaskHandler,
    [postProjectTask.success]: postProjectTaskSuccessHandler,
    [postProjectTask.fail]: postProjectTaskFailHandler,

    [patchProjectTask.toString()]: patchProjectTaskHandler,
    [patchProjectTask.success]: patchProjectTaskSuccessHandler,
    [patchProjectTask.fail]: patchProjectTaskFailHandler,

    [deleteProjectTask.toString()]: deleteProjectTaskHandler,
    [deleteProjectTask.success]: deleteProjectTaskSuccessHandler,
    [deleteProjectTask.fail]: deleteProjectTaskFailHandler,
  },
  new DownloadList(Task)
);
