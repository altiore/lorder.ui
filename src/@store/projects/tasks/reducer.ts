import { AxiosResponse } from 'axios';
import get from 'lodash/get';
import moment from 'moment';
import { Action, ActionMeta, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

import { DownloadList } from '@store/@common/entities';
import { IRequestAction } from '@store/@common/requestActions';
import { archiveTask, Task } from '@store/tasks';
import { postAndStartUserWork, UserWork, userWorks } from '@store/tasks/user-works';
import { User } from '@store/users';
import { deleteProjectTask, moveProjectTask, patchProjectTask, postProjectTask, updateProjectTask } from './actions';
import { ProjectTask } from './ProjectTask';

type S = DownloadList<ProjectTask>;
interface IProjectRequest extends IRequestAction<Partial<ProjectTask>> {
  sequenceNumber: number;
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
  const taskIndex = state.list.findIndex(el => get(payload, 'sequenceNumber') === el.sequenceNumber);
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
  const taskIndex = state.list.findIndex(el => get(payload, 'sequenceNumber') === el.sequenceNumber);
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
  const taskIndex = state.list.findIndex(el => get(payload, 'sequenceNumber') === el.sequenceNumber);
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
  const taskIndex = state.list.findIndex(el => meta.previousAction.payload.sequenceNumber === el.sequenceNumber);
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

const postAndStartUserWorkHandler = (state: S, action: ActionMeta<any, any>) => {
  let sequenceNumber: number;
  if (action.meta) {
    sequenceNumber = get(action.meta, 'previousAction.payload.sequenceNumber');
  } else {
    sequenceNumber = get(action.payload, 'sequenceNumber');
  }
  const index = state.list.findIndex(el => sequenceNumber === el.sequenceNumber);
  if (~index) {
    return state.updateItem(index, {
      userWorks: userWorks(state.list[index].userWorks, action),
    });
  }
  const data: Partial<Task> = get(action, 'payload.request.data');
  return state.startLoading().addItem({
    description: data.description,
    id: uniqid('Task'),
    performerId: get(action, 'payload.userId'),
    projectId: data.projectId,
    status: 2,
    title: data.title,
    userWorks: new DownloadList<UserWork>(
      UserWork,
      [
        {
          description: data.description,
          id: uniqid('UserWork'),
          projectId: data.projectId,
          startAt: moment(),
        },
      ],
      true
    ),
  });
};

const postAndStartUserWorkSuccessHandler = (state: S, action: ActionMeta<any, any>) => {
  let taskId: number;
  // if meta exists get taskId from meta
  if (action.meta) {
    taskId = get(action.meta, 'previousAction.payload.taskId');
  } else {
    taskId = get(action.payload, 'taskId');
  }
  const index = state.list.findIndex(el => taskId === el.id);
  if (~index) {
    return state.stopLoading().updateItem(index, {
      userWorks: userWorks(state.list[index].userWorks, action),
    });
  }
  const userWork: Partial<UserWork> = get(action, 'payload.data.started');
  const task: Partial<Task> = get(action, 'payload.data.started.task');
  return state.stopLoading().updateItem(0, {
    description: task.description,
    id: task.id,
    performerId: task.performerId,
    projectId: userWork.projectId,
    status: task.status,
    title: task.title,
    userWorks: new DownloadList<UserWork>(UserWork, [userWork], true),
  });
};

const postAndStartUserWorkFailHandler = (state: S, action: ActionMeta<any, any>) => {
  let taskId: number;
  // if meta exists get taskId from meta
  if (action.meta) {
    taskId = get(action.meta, 'previousAction.payload.taskId');
  } else {
    taskId = get(action.payload, 'taskId');
  }
  const index = state.list.findIndex(el => taskId === el.id);
  if (~index) {
    return state.stopLoading().updateItem(index, {
      userWorks: userWorks(state.list[index].userWorks, action),
    });
  }
  return state.stopLoading().removeItem(0);
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

    [postAndStartUserWork.toString()]: postAndStartUserWorkHandler,
    [postAndStartUserWork.success]: postAndStartUserWorkSuccessHandler,
    [postAndStartUserWork.fail]: postAndStartUserWorkFailHandler,
  },
  new DownloadList(ProjectTask)
);
