import get from 'lodash/get';
import { handleActions } from 'redux-actions';

import { DownloadList } from '../@common/entities';
import { createTaskStatusMove, deleteTaskStatusMove, fetchTaskStatusMoves } from './actions';
import { StatusMove } from './StatusMove';

import { IDownloadList, IMeta, IStatusMove } from '@types';

type S = IDownloadList<IStatusMove>;
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
  return s.addItem({ id: 0, ...get(payload, ['request', 'data']) });
};

const createTaskStatusMoveSuccessHandler = (s, { payload }) => {
  const index = s.list.findIndex(el => el.id === 0);
  if (index === -1) {
    throw new Error('Item not found!');
  }
  return s.stopLoading().updateItem(index, get(payload, ['data']));
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

export const projectStatusMovesReducer: any = handleActions<S, any, M>(
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
  },
  new DownloadList(StatusMove)
);
