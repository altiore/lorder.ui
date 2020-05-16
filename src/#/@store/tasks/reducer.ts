import get from 'lodash/get';
import { Action, ActionMeta, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { User } from '#/#/@store/users';
import { DownloadList } from '#/@store/@common/entities';
import { combineActions } from '#/@store/@common/helpers';
import {
  getUserWorks,
  patchAndStopUserWork,
  patchUserWork,
  pauseUserWork,
  postAndStartUserWork,
} from '#/@store/user-works';
import { UserWork } from '#/@store/user-works/UserWork';

import { AxiosResponse } from 'axios';
import uniqid from 'uniqid';

import { IRequestAction } from '../@common/requestActions';
import {
  archiveTaskA,
  deleteProjectTask,
  fetchProjectTasksA,
  fetchTaskDetailsA,
  getAllTasks,
  moveProjectTask,
  patchProjectTask,
  postProjectTask,
  replaceTasks,
  updateProjectTask,
} from './actions';
import { Task } from './Task';

interface IProjectRequest extends IRequestAction<Partial<Task>> {
  sequenceNumber: number;
  projectId: number;
  prevStatus?: number;
  users: User[];
}

type S = DownloadList<Task>;
type P<T = any> = AxiosResponse<T> | Array<Partial<Task>>;

const getAllTasksHandler = (state: S) => {
  return state.startLoading();
};

const getAllTasksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload);
};

const getAllTasksFailHandler = (state: S) => {
  return state.stopLoading();
};

const postAndStartUserWorkHandler = (state: S, action: ActionMeta<any, any>) => {
  let taskId: number;
  if (action.meta) {
    taskId = get(action.meta, 'previousAction.payload.taskId');
  } else {
    taskId = get(action.payload, 'taskId');
  }
  const index = state.list.findIndex(el => taskId === el.id);
  if (~index) {
    return state.startLoading();
  }
  const data: Partial<Task> = get(action, 'payload.request.data');
  return state.startLoading().addItem({
    description: data.description,
    id: uniqid('Task'),
    projectId: data.projectId,
    status: 2,
    title: data.title,
  });
};

const postAndStartUserWorkSuccessHandler = (state: S, action: ActionMeta<any, any>) => {
  let resState = state;
  let taskId: number;
  // if meta exists get taskId from meta
  if (action.meta) {
    taskId = get(action.meta, 'previousAction.payload.taskId');
  } else {
    taskId = get(action.payload, ['data', 'started', 'taskId']);
  }
  const task: Partial<Task> = get(action, 'payload.data.started.task');
  const finishedTasks = get(action, ['payload', 'data', 'finished'], []);
  finishedTasks.forEach(finishedUserWork => {
    const finishedIndex = resState.list.findIndex(el => finishedUserWork.taskId === el.id);
    if (~finishedIndex) {
      resState = resState.updateItem(finishedIndex, finishedUserWork.task);
    }
  });
  const index = state.list.findIndex(el => taskId === el.id);
  if (~index) {
    return resState.stopLoading().updateItem(index, task);
  }
  return resState.stopLoading().updateItem(0, task);
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
    return state.stopLoading();
  }
  return state.stopLoading().removeItem(0);
};

const postProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  const data = payload && payload.request.data;
  return state.startLoading().addItem(new Task({ id: uniqid(), userTasks: [], ...data }));
};

const postProjectTaskSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  // TODO: find index before updateItem, because we can change logic for showing data
  return state.stopLoading().updateItem(0, payload && payload.data);
};

const postProjectTaskFailHandler = (state: S) => {
  return state.stopLoading().removeItem(0);
};

const patchAndStopUserWorkHandler = (state: S, action: ActionMeta<any, any>) => {
  let taskId: number;
  if (action.meta) {
    taskId = get(action.meta, 'previousAction.payload.taskId');
  } else {
    taskId = get(action.payload, 'taskId');
  }
  const index = state.list.findIndex(el => taskId === el.id);
  if (~index) {
    return state.startLoading();
  }
  return state.startLoading();
};

const patchAndStopUserWorkSuccessHandler = (state: S, action: ActionMeta<any, any>) => {
  const { next, previous } = get(action, ['payload', 'data']);
  let resState: S = state;
  const nextIndex = resState.list.findIndex(el => next.taskId === el.id);
  if (!~nextIndex) {
    resState = resState.addItem(next.task);
  } else {
    resState = resState.updateItem(nextIndex, next.task);
  }
  const prevIndex = resState.list.findIndex(el => previous.taskId === el.id);
  if (!~prevIndex) {
    resState = resState.addItem(previous.task);
  } else {
    resState = resState.updateItem(prevIndex, previous.task);
  }
  return resState.stopLoading();
};

const patchAndStopUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const replaceTasksHandler = (state: S, { payload }: Action<Array<Partial<UserWork>>>) => {
  if (!payload || !payload.length) {
    throw new Error('replaceTasksHandler Error: payload is required');
  }
  let newState = new DownloadList(Task, state);
  payload.forEach(userWorkData => {
    const index = newState.list.findIndex(el => userWorkData.taskId === el.id);
    if (~index) {
      const task = { ...get(userWorkData, 'task') } as any;
      newState = newState.updateItem(index, task);
    }
  });
  return newState;
};

const patchProjectTaskHandler = (state: S, { payload }: Action<P>) => {
  const index = state.list.findIndex(
    el => el.projectId === get(payload, 'projectId') && el.sequenceNumber === get(payload, 'sequenceNumber')
  );
  if (!~index) {
    return state.startLoading();
  }
  return state.startLoading().updateItem(index, { ...get(payload, 'request.data'), users: get(payload, 'users') });
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

const moveProjectTaskHandler = (state: S, { payload }: Action<P>) => {
  const taskIndex = state.list.findIndex(
    el => get(payload, 'sequenceNumber') === el.sequenceNumber && get(payload, 'projectId') === el.projectId
  );
  const status = get(payload, 'request.data.status');
  if (taskIndex !== -1) {
    return state
      .updateItem(taskIndex, {
        status: parseInt(status, 0),
      })
      .startLoading();
  }
  return state.startLoading();
};

const moveProjectTaskSuccessHandler = (state: S) => {
  return state.stopLoading();
};

const moveProjectTaskFailHandler = (state: S, { payload, meta }: ActionMeta<any, { previousAction: { payload } }>) => {
  const taskIndex = state.list.findIndex(
    el =>
      meta.previousAction.payload.sequenceNumber === el.sequenceNumber &&
      meta.previousAction.payload.projectId === el.projectId
  );
  return state.stopLoading().updateItem(taskIndex, {
    status: meta.previousAction.payload.prevStatus,
  });
};

const deleteProjectTaskHandler = (state: S, { payload }: Action<P>) => {
  const index = state.list.findIndex(
    el => el.projectId === get(payload, 'projectId') && el.sequenceNumber === get(payload, 'sequenceNumber')
  );
  if (!~index) {
    return state.startLoading();
  }
  return state.startLoading().removeItem(index);
};

const deleteProjectTaskSuccessHandler = (state: S) => {
  return state.stopLoading();
};

const deleteProjectTaskFailHandler = (state: S) => {
  // TODO: implement revert back to previous state
  return state.stopLoading();
};

const fetchTaskDetailsHandler = (state: S) => {
  return state.startLoading();
};

const fetchTaskDetailsSuccessHandler = (state: S, { payload }: Action<P>) => {
  const index = state.list.findIndex(el => el.id === get(payload, ['data', 'id']));
  const taskWithDetails = { ...get(payload, 'data'), isDetailsLoaded: true };
  if (~index) {
    return state.updateItem(index, taskWithDetails).stopLoading();
  }
  return state.addItem(taskWithDetails).stopLoading();
};

const fetchTaskDetailsFailHandler = (state: S) => {
  // TODO: implement revert back to previous state
  return state.stopLoading();
};

const patchUserWorkSuccessHandler = (state: S, { payload }) => {
  let resState = state;
  const edited = get(payload, ['data', 'edited']);
  const editedIndex = resState.list.findIndex(el => el.id === edited.taskId);
  if (editedIndex !== -1 && edited.task) {
    resState = resState.updateItem(editedIndex, edited.task);
  }

  const removed = get(payload, ['data', 'removed'], []);
  removed.forEach(removedUserWork => {
    const removedIndex = resState.list.findIndex(el => removedUserWork.taskId === el.id);
    if (removedIndex !== -1 && removedUserWork.task) {
      resState = resState.updateItem(removedIndex, removedUserWork.task);
    }
  });

  const touched = get(payload, ['data', 'touched'], []);
  touched.forEach(touchedUserWork => {
    const touchedIndex = resState.list.findIndex(el => touchedUserWork.taskId === el.id);
    if (touchedIndex !== -1 && touchedUserWork.task) {
      resState = resState.updateItem(touchedIndex, touchedUserWork.task);
    }
  });

  return resState;
};

const logOutHandler = () => {
  return new DownloadList(Task);
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

const getUserWorksSuccess = (state, { payload }) => {
  const preparedData = {
    data: get(payload, 'data', []).map(el => el.task),
  };
  return state.finishLoading(preparedData);
};

export const tasks: any = handleActions<S, any, any>(
  {
    [combineActions(getAllTasks.toString(), fetchProjectTasksA.toString())]: getAllTasksHandler,
    [combineActions(getAllTasks.success, fetchProjectTasksA.success)]: getAllTasksSuccessHandler,
    [combineActions(getAllTasks.fail, fetchProjectTasksA.fail)]: getAllTasksFailHandler,

    [postAndStartUserWork.toString()]: postAndStartUserWorkHandler,
    [postAndStartUserWork.success]: postAndStartUserWorkSuccessHandler,
    [postAndStartUserWork.fail]: postAndStartUserWorkFailHandler,

    [postProjectTask.toString()]: postProjectTaskHandler,
    [postProjectTask.success]: postProjectTaskSuccessHandler,
    [postProjectTask.fail]: postProjectTaskFailHandler,

    [combineActions(patchAndStopUserWork.toString(), pauseUserWork.toString()).toString()]: patchAndStopUserWorkHandler,
    [combineActions(patchAndStopUserWork.success, pauseUserWork.success)]: patchAndStopUserWorkSuccessHandler,
    [combineActions(patchAndStopUserWork.fail, pauseUserWork.fail)]: patchAndStopUserWorkFailHandler,

    [replaceTasks.toString()]: replaceTasksHandler,

    [patchProjectTask.toString()]: patchProjectTaskHandler,
    [patchProjectTask.success]: patchProjectTaskSuccessHandler,
    [patchProjectTask.fail]: patchProjectTaskFailHandler,

    [moveProjectTask.toString()]: moveProjectTaskHandler,
    [moveProjectTask.success]: moveProjectTaskSuccessHandler,
    [moveProjectTask.fail]: moveProjectTaskFailHandler,

    [deleteProjectTask.toString()]: deleteProjectTaskHandler,
    [deleteProjectTask.success]: deleteProjectTaskSuccessHandler,
    [deleteProjectTask.fail]: deleteProjectTaskFailHandler,

    [archiveTaskA.toString()]: deleteProjectTaskHandler,
    [archiveTaskA.success]: deleteProjectTaskSuccessHandler,
    [archiveTaskA.fail]: deleteProjectTaskFailHandler,

    [fetchTaskDetailsA.toString()]: fetchTaskDetailsHandler,
    [fetchTaskDetailsA.success]: fetchTaskDetailsSuccessHandler,
    [fetchTaskDetailsA.fail]: fetchTaskDetailsFailHandler,

    [patchUserWork.success]: patchUserWorkSuccessHandler,

    [PURGE]: logOutHandler,

    [updateProjectTask.toString()]: updateProjectTaskHandler,

    [getUserWorks.success]: getUserWorksSuccess,
  },
  new DownloadList(Task)
);
