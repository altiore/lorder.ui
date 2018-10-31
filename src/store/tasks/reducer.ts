import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import omit from 'lodash-es/omit';
import * as moment from 'moment';
import { Action, ActionMeta, handleActions } from 'redux-actions';
import uniqid from 'uniqid';

import { DownloadList } from 'src/store/@common/entities';
import { combineActions } from 'src/store/@common/helpers';
import { getAllTasks, replaceTasks } from './actions';
import { Task } from './Task';
import {
  deleteUserWork,
  patchAndStopUserWork,
  patchUserWork,
  postAndStartUserWork,
  UserWork,
  userWorks,
} from './user-works';

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

const taskUserWorkHandler = (state: S, action: ActionMeta<any, any>) => {
  let taskId: number;
  // if meta exists get taskId from meta
  if (action.meta) {
    taskId = get(action.meta, 'previousAction.payload.taskId');
  } else {
    taskId = get(action.payload, 'taskId');
  }
  const index = state.list.findIndex(el => taskId === el.id);
  if (!~index) {
    console.log(action);
    throw new Error(`Не смог найти измененную задачу index= ${index}`);
  }

  return state.updateItem(index, {
    userWorks: userWorks(state.list[index].userWorks, action),
  });
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
    return state.updateItem(index, {
      userWorks: userWorks(state.list[index].userWorks, action),
    });
  }
  const data: Partial<Task> = get(action, 'payload.request.data');
  return state.startLoading().addItem({
    description: data.description,
    id: uniqid('Task'),
    projectId: data.projectId,
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
    projectId: userWork.projectId,
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

const replaceTasksHandler = (state: S, { payload }: Action<Array<Partial<UserWork>>>) => {
  if (!payload || !payload.length) {
    throw new Error('replaceTasksHandler Error: payload is required');
  }
  let newState = new DownloadList(Task, state);
  payload.map(userWorkData => {
    const index = newState.list.findIndex(el => userWorkData.taskId === el.id);
    if (~index) {
      const task = { ...get(userWorkData, 'task') };
      task.userWorks = [omit(userWorkData, ['task'])];
      newState = newState.updateItem(index, task);
    }
  });
  return newState;
};

export const tasks = handleActions<S, P>(
  {
    [getAllTasks.toString()]: getAllTasksHandler,
    [getAllTasks.success]: getAllTasksSuccessHandler,
    [getAllTasks.fail]: getAllTasksFailHandler,

    [postAndStartUserWork.toString()]: postAndStartUserWorkHandler,
    [postAndStartUserWork.success]: postAndStartUserWorkSuccessHandler,
    [postAndStartUserWork.fail]: postAndStartUserWorkFailHandler,

    [combineActions(patchAndStopUserWork, patchUserWork, deleteUserWork)]: taskUserWorkHandler,

    [replaceTasks.toString()]: replaceTasksHandler,
  },
  new DownloadList(Task)
);
