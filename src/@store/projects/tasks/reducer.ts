import { AxiosResponse } from 'axios';
import get from 'lodash/get';
import { Action, ActionMeta, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

import { DownloadList } from '@store/@common/entities';
import { IRequestAction } from '@store/@common/requestActions';
import { archiveTask } from '@store/tasks/actions';
import { User } from '@store/users';
import { deleteProjectTask, moveProjectTask, patchProjectTask, postProjectTask, updateProjectTask } from './actions';
import { ProjectTask } from './ProjectTask';

type S = DownloadList<ProjectTask>;
interface IProjectRequest extends IRequestAction<Partial<ProjectTask>> {
  taskId: number;
  projectId: number;
  prevStatus?: number;
  users: User[];
}
type P = IProjectRequest | AxiosResponse;

const postProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  const data = payload && payload.request.data;
  return state.startLoading().addItem(new ProjectTask({ id: uniqid(), ...data }));
};

const postProjectTaskSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  // TODO: find index before updateItem, because we can change logic for showing data
  return state.stopLoading().updateItem(0, payload && payload.data);
};

const postProjectTaskFailHandler = (state: S) => {
  return state.stopLoading().removeItem(0);
};

const patchProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  if (!payload) {
    throw new Error('patchProjectTaskHandler Error: payload is required');
  }
  const preparedData: Partial<ProjectTask> = { ...payload.request.data };
  if (preparedData.users) {
    preparedData.users = [...payload.users];
  }
  const taskIndex = state.list.findIndex(el => get(payload, 'taskId') === el.id);
  if (!~taskIndex) {
    return state.startLoading();
  }
  return state.startLoading().updateItem(taskIndex, preparedData);
};

const patchProjectTaskSuccessHandler = (state: S) => {
  return state.stopLoading();
};

const patchProjectTaskFailHandler = (state: S, action) => {
  const task = get(action, ['error', 'response', 'data', 'task']);
  if (!task) {
    return state.stopLoading();
  }
  const taskIndex = state.list.findIndex(el => get(task, 'id') === el.id);
  if (!~taskIndex) {
    return state;
  }
  return state.stopLoading().updateItem(taskIndex, task);
};

const deleteProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  const taskIndex = state.list.findIndex(el => get(payload, 'taskId') === el.id);
  if (!~taskIndex) {
    return state.startLoading();
  }
  return state.startLoading().removeItem(taskIndex);
};

const deleteProjectTaskSuccessHandler = (state: S) => {
  return state.stopLoading();
};

const deleteProjectTaskFailHandler = (state: S) => {
  return state.stopLoading();
};

const moveProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  const taskIndex = state.list.findIndex(el => get(payload, 'taskId') === el.id);
  const status = get(payload, 'request.data.status');
  return state.startLoading().updateItem(taskIndex, {
    status,
  });
};

const moveProjectTaskSuccessHandler = (state: S) => {
  return state.stopLoading();
};

const moveProjectTaskFailHandler = (
  state: S,
  { payload, meta }: ActionMeta<any, { previousAction: { payload: IProjectRequest } }>
) => {
  const taskIndex = state.list.findIndex(el => meta.previousAction.payload.taskId === el.id);
  return state.stopLoading().updateItem(taskIndex, {
    status: meta.previousAction.payload.prevStatus,
  });
};

const updateProjectTaskHandler = (state, { payload: task }) => {
  if (!task) {
    throw new Error('updateProjectTaskHandler Error: payload is required and MUST be task entity');
  }
  const taskIndex = state.list.findIndex(el => get(task, 'id') === el.id);
  if (!~taskIndex) {
    return state;
  }
  return state.updateItem(taskIndex, task);
};

export const projectTasks = handleActions<S, any, any>(
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

    [archiveTask.toString()]: deleteProjectTaskHandler,
    [archiveTask.success]: deleteProjectTaskSuccessHandler,
    [archiveTask.fail]: deleteProjectTaskFailHandler,

    [moveProjectTask.toString()]: moveProjectTaskHandler,
    [moveProjectTask.success]: moveProjectTaskSuccessHandler,
    [moveProjectTask.fail]: moveProjectTaskFailHandler,

    [updateProjectTask.toString()]: updateProjectTaskHandler,
  },
  new DownloadList(ProjectTask)
);
