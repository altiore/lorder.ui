import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { DownloadList } from '../@common/entities';
import { getAllTaskTypes } from './actions';
import { TaskType } from './task-type';

type S = DownloadList<TaskType>;
type P = AxiosResponse;

const getAllTaskTypesHandler = (state: S): S => {
  return state.startLoading();
};

const getAllTaskTypesSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return state.finishLoading(payload);
};

const getAllTaskTypesFailHandler = (state: S): S => {
  return state.stopLoading();
};

const logOutHandler = () => {
  return new DownloadList(TaskType);
};

export const taskTypes = handleActions<S, P>(
  {
    [getAllTaskTypes.toString()]: getAllTaskTypesHandler,
    [getAllTaskTypes.success]: getAllTaskTypesSuccessHandler,
    [getAllTaskTypes.fail]: getAllTaskTypesFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(TaskType)
);
