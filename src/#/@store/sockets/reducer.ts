import { handleActions } from 'redux-actions';

import { initSocketsAction, updateTaskAction } from './actions';
import { Sockets } from './Sockets';

import { ISockets } from '@types';

const initSocketsHandler = (state: ISockets) => {
  return new Sockets({
    init: true,
  });
};

const updateTaskHandler = (state: ISockets, { payload }) => {
  return new Sockets({
    ...state,
    messages: [...state.messages, payload],
  });
};

export const socketsReducer: any = handleActions<ISockets>(
  {
    [initSocketsAction.toString()]: initSocketsHandler,
    [updateTaskAction.toString()]: updateTaskHandler,
  } as any,
  new Sockets()
);
