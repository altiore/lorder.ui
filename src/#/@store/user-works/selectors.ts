import groupBy from 'lodash/groupBy';
import { createSelector } from 'reselect';

import { convertSecondsToDurationWithLocal } from '#/@store/@common/helpers';
import { UserWork } from '#/@store/tasks';

import { IState } from '@types';

export const lastUserWorks = (state: IState): any => state.userWorks;

export const totalTimeSpentTodayInSeconds = createSelector(
  lastUserWorks,
  state => state.list.reduce((res, userWork: UserWork) => res + userWork.durationInSeconds, 0)
);

export const totalTimeSpentToday = createSelector(
  totalTimeSpentTodayInSeconds,
  seconds => convertSecondsToDurationWithLocal(seconds)
);

export const userWorksGroupedByProject = createSelector(
  lastUserWorks,
  state => groupBy(state.list, 'projectId')
);

export const getUserWorksByProjectId = createSelector(
  userWorksGroupedByProject,
  groupedUserWorks => (projectId: number) => groupedUserWorks[projectId] || []
);

export const timeSpentByProjectIdInSeconds = createSelector(
  getUserWorksByProjectId,
  getUserWorks => (projectId: number) =>
    getUserWorks(projectId).reduce((res: number, userWork: UserWork) => {
      return res + userWork.durationInSeconds;
    }, 0)
);

export const timeSpentByProjectId = createSelector(
  timeSpentByProjectIdInSeconds,
  getSeconds => (projectId: number) => convertSecondsToDurationWithLocal(getSeconds(projectId))
);

export const timePercentByProjectId = createSelector(
  [totalTimeSpentTodayInSeconds, timeSpentByProjectIdInSeconds],
  (totalSec, getProjectSec) => (projectId: number): string | number =>
    totalSec ? Math.floor((getProjectSec(projectId) / totalSec) * 100) : '...'
);
