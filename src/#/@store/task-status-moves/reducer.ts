import { handleActions } from 'redux-actions';
import get from 'lodash/get';

import { IDownloadList, IMeta, ITaskStatusMove } from '@types';
import { createTaskStatusMove, deleteManyTaskStatusMoves, deleteTaskStatusMove, fetchTaskStatusMoves } from './actions';
import { DownloadList } from '../@common/entities';
import { TaskStatusMove } from './TaskStatusMove';

type S = IDownloadList<ITaskStatusMove>;
type M = IMeta<any>;

const fetchTaskStatusMovesHandler = s => {
  return s.startLoading();
};

const fetchTaskStatusMovesSuccessHandler = (s, { payload }) => {
  return s.finishLoading(payload);
};

const fetchTaskStatusMovesFailHandler = s => {
  return s.stopLoading();
};

const createTaskStatusMoveHandler = (s, { payload }) => {
  return s.addItem(get(payload, ['request', 'data']));
};

const createTaskStatusMoveSuccessHandler = (s, { payload }) => {
  return s.stopLoading();
};

const createTaskStatusMoveFailHandler = s => {
  return s.stopLoading();
};

const deleteTaskStatusMoveHandler = (s, { payload }) => {
  const index = s.list.findIndex(el => el.id === payload.id);
  if (index !== -1) {
    return s.removeItem(index);
  }
  return s;
};

const deleteTaskStatusMoveSuccessHandler = (s, { payload }) => {
  return s.stopLoading();
};

const deleteTaskStatusMoveFailHandler = s => {
  return s.stopLoading();
};

const deleteManyTaskStatusMovesHandler = (s, { payload }) => {
  let res = s;
  payload.ids.forEach(id => {
    const index = res.list.findIndex(el => el.id === id);
    if (index !== -1) {
      res = res.removeItem(index);
    }
  });
  return res;
};

const deleteManyTaskStatusMovesSuccessHandler = (s, { payload }) => {
  return s.stopLoading();
};

const deleteManyTaskStatusMovesFailHandler = s => {
  return s.stopLoading();
};

export const taskStatusMoves = handleActions<S, any, M>(
  {
    [fetchTaskStatusMoves.toString()]: fetchTaskStatusMovesHandler,
    [fetchTaskStatusMoves.success]: fetchTaskStatusMovesSuccessHandler,
    [fetchTaskStatusMoves.fail]: fetchTaskStatusMovesFailHandler,

    [createTaskStatusMove.toString()]: createTaskStatusMoveHandler,
    [createTaskStatusMove.success]: createTaskStatusMoveSuccessHandler,
    [createTaskStatusMove.fail]: createTaskStatusMoveFailHandler,

    [deleteTaskStatusMove.toString()]: deleteTaskStatusMoveHandler,
    [deleteTaskStatusMove.success]: deleteTaskStatusMoveSuccessHandler,
    [deleteTaskStatusMove.fail]: deleteTaskStatusMoveFailHandler,

    [deleteManyTaskStatusMoves.toString()]: deleteManyTaskStatusMovesHandler,
    [deleteManyTaskStatusMoves.success]: deleteManyTaskStatusMovesSuccessHandler,
    [deleteManyTaskStatusMoves.fail]: deleteManyTaskStatusMovesFailHandler,
  },
  new DownloadList(TaskStatusMove)
);
