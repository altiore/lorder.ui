import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState, IStatistics } from '@types';

const baseState = (state: IState): IStatistics => state.statistics;

export const activityStat = createDeepEqualSelector(baseState, s => s.activity);

export const activeUsersCount = createDeepEqualSelector(baseState, s => s.activeUsersCount);

export const activeProjectsCount = createDeepEqualSelector(baseState, s => s.activeProjectsCount);

export const publicProjectsCount = createDeepEqualSelector(baseState, s => s.publicProjectsCount);
