import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

import { DownloadList } from '../../@common/entities';
import { IRequestAction } from '../../@common/requestActions';
import { deleteProjectTask, postProjectTask } from './actions';
import { Task } from './Task';

type S = DownloadList<Task>;
type ProjectRequest = IRequestAction<Partial<Task>>;
type P = ProjectRequest | AxiosResponse;

const postProjectTaskHandler = (state: S, { payload }: Action<ProjectRequest>) => {
  const data = payload && payload.request.data;
  return state.startLoading().addItem(new Task({ id: uniqid(), ...data }));
};

const postProjectTaskSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.stopLoading().updateItem(-1, payload && payload.data);
};

const postProjectTaskFailHandler = (state: S) => {
  return state.stopLoading().removeItem(-1);
};

const deleteProjectTaskHandler = (state: S, { payload }: Action<ProjectRequest>) => {
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
    [deleteProjectTask.toString()]: deleteProjectTaskHandler,
    [deleteProjectTask.success]: deleteProjectTaskSuccessHandler,
    [deleteProjectTask.fail]: deleteProjectTaskFailHandler,
  },
  new DownloadList(Task)
);
