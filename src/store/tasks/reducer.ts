import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, ActionMeta, handleActions } from 'redux-actions';

import { DownloadList } from 'src/store/@common/entities';
import { combineActions } from 'src/store/@common/helpers';
import { getAllTasks } from './actions';
import { Task } from './Task';
import { deleteUserWork, patchAndStopUserWork, postAndStartUserWork, userWorks } from './user-works';

type S = DownloadList<Task>;
type P<T = any> = AxiosResponse<T>;

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
  let index: number;
  // if meta exists get taskId from meta
  if (action.meta) {
    index = state.list.findIndex(el => get(action.meta, 'previousAction.payload.taskId') === el.id);
  } else {
    index = state.list.findIndex(el => get(action.payload, 'taskId') === el.id);
  }
  if (!~index) {
    console.log(action);
    throw new Error(`Не смог найти измененную задачу index= ${index}`);
  }

  return state.startLoading().updateItem(index, {
    userWorks: userWorks(state.list[index].userWorks, action),
  });
};

export const tasks = handleActions<S, P>(
  {
    [getAllTasks.toString()]: getAllTasksHandler,
    [getAllTasks.success]: getAllTasksSuccessHandler,
    [getAllTasks.fail]: getAllTasksFailHandler,

    [combineActions(postAndStartUserWork, patchAndStopUserWork, deleteUserWork)]: taskUserWorkHandler,
  },
  new DownloadList(Task)
);
