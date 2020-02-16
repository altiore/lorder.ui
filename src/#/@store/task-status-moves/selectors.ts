import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.taskStatusMoves;

export const taskStatusMoves = createSelector(
  baseState,
  s => s.list
);
