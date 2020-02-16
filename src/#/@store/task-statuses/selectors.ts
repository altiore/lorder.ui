import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.taskStatuses;

export const taskStatusesList = createSelector(
  baseState,
  s => s.list
);
