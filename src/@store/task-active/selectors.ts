import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.taskActive;

export const taskLogs = createSelector(
  baseState,
  s => s.taskLogs.list
);
