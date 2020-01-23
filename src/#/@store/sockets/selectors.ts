import { createSelector } from 'reselect';

import { ISockets, IState } from '@types';

const baseState = (state: IState): ISockets => state.sockets;

export const socketsInit = createSelector(
  baseState,
  (state: ISockets): boolean => Boolean(state.init)
);

export const socketMessages = createSelector(
  baseState,
  (state: ISockets): string[] => state.messages
);
