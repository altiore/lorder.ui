import get from 'lodash/get';
import { handleActions } from 'redux-actions';

import { DownloadList } from '../@common/entities';
import { createTaskStatus, deleteManyTaskStatuses, deleteTaskStatus, fetchTaskStatuses } from './actions';
import { TaskStatus } from './TaskStatus';

import { IDownloadList, IMeta, ITaskStatus } from '@types';

type S = IDownloadList<ITaskStatus>;
type M = IMeta<any>;

const fetchTaskStatusesHandler = s => {
  return s.startLoading();
};

const fetchTaskStatusesSuccessHandler = (s, { payload }) => {
  return s.finishLoading(payload);
};

const fetchTaskStatusesFailHandler = s => {
  return s.stopLoading();
};

const createTaskStatusHandler = (s, { payload }) => {
  return s.addItem(get(payload, ['request', 'data']));
};

const createTaskStatusSuccessHandler = (s, { payload }) => {
  const index = s.list.findIndex(el => el.name === get(payload, ['data', 'name']));
  if (index !== -1) {
    return s.updateItem(index, get(payload, 'data')).stopLoading();
  }
  return s.stopLoading();
};

const createTaskStatusFailHandler = s => {
  return s.stopLoading();
};

const deleteTaskStatusHandler = (s, { payload }) => {
  const index = s.list.findIndex(el => el.id === payload.id);
  if (index !== -1) {
    return s.removeItem(index);
  }
  return s;
};

const deleteTaskStatusSuccessHandler = (s, { payload }) => {
  return s.stopLoading();
};

const deleteTaskStatusFailHandler = s => {
  return s.stopLoading();
};

const deleteManyTaskStatusesHandler = (s, { payload }) => {
  let res = s;
  payload.ids.forEach(id => {
    const index = res.list.findIndex(el => el.id === id);
    if (index !== -1) {
      res = res.removeItem(index);
    }
  });
  return res;
};

const deleteManyTaskStatusesSuccessHandler = (s, { payload }) => {
  return s.stopLoading();
};

const deleteManyTaskStatusesFailHandler = s => {
  return s.stopLoading();
};

export const taskStatuses: any = handleActions<S, any, M>(
  {
    [fetchTaskStatuses.toString()]: fetchTaskStatusesHandler,
    [fetchTaskStatuses.success]: fetchTaskStatusesSuccessHandler,
    [fetchTaskStatuses.fail]: fetchTaskStatusesFailHandler,

    [createTaskStatus.toString()]: createTaskStatusHandler,
    [createTaskStatus.success]: createTaskStatusSuccessHandler,
    [createTaskStatus.fail]: createTaskStatusFailHandler,

    [deleteTaskStatus.toString()]: deleteTaskStatusHandler,
    [deleteTaskStatus.success]: deleteTaskStatusSuccessHandler,
    [deleteTaskStatus.fail]: deleteTaskStatusFailHandler,

    [deleteManyTaskStatuses.toString()]: deleteManyTaskStatusesHandler,
    [deleteManyTaskStatuses.success]: deleteManyTaskStatusesSuccessHandler,
    [deleteManyTaskStatuses.fail]: deleteManyTaskStatusesFailHandler,
  },
  new DownloadList(TaskStatus)
);
