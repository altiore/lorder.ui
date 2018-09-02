import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';

import { DownloadList } from '../@common/entities';
import { getAllTaskTypes } from './actions';
import { TaskType } from './task-type';

type S = DownloadList<TaskType>;
type P = AxiosResponse;

const getAllTaskTypesHandler = (state: S): S => {
  return new DownloadList({
    ...state,
    isLoading: true,
  });
};

const getAllTaskTypesSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return new DownloadList({
    ...state,
    isLoaded: true,
    isLoading: false,
    list: payload && payload.data && payload.data.map((el: any) => new TaskType(el)),
  });
};

const getAllTaskTypesFailHandler = (state: S): S => {
  return new DownloadList();
};

export const taskTypes = handleActions<S, P>(
  {
    [getAllTaskTypes.toString()]: getAllTaskTypesHandler,
    [getAllTaskTypes.success]: getAllTaskTypesSuccessHandler,
    [getAllTaskTypes.fail]: getAllTaskTypesFailHandler,
  },
  new DownloadList()
);
