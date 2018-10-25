import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';

import { DownloadList } from '../@common/entities';
import { getAllTasks } from './actions';
import { Task } from './Task';

type S = DownloadList<Task>;
type P<T = any> = AxiosResponse<T>;

const getAllUserWorksHandler = (state: S) => {
  return state.startLoading();
};

const getAllUserWorksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload);
};

const getAllUserWorksFailHandler = (state: S) => {
  return state.stopLoading();
};

export const tasks = handleActions<S, P>(
  {
    [getAllTasks.toString()]: getAllUserWorksHandler,
    [getAllTasks.success]: getAllUserWorksSuccessHandler,
    [getAllTasks.fail]: getAllUserWorksFailHandler,
  },
  new DownloadList(Task)
);
