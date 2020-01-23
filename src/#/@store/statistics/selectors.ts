import { createSelector } from 'reselect';

import { IState, IStatistics } from '@types';

const baseState = (state: IState): IStatistics => state.statistics;

export const activityStat = createSelector(
  baseState,
  s => s.activity
);

export const activeUsersCount = createSelector(
  baseState,
  s => s.activeUsersCount
);

export const activeProjectsCount = createSelector(
  baseState,
  s => s.activeProjectsCount
);

export const publicProjectsCount = createSelector(
  baseState,
  s => s.publicProjectsCount
);
