import groupBy from 'lodash-es/groupBy';
import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { convertSecondsToDurationWithLocal } from 'src/store/@common/helpers';
import { UserWork } from 'src/store/tasks';

export const lastUserWorks = (state: IState) => state.userWorks;

export const totalTimeSpentTodayInSeconds = createSelector(lastUserWorks, state =>
  state.list.reduce((res, userWork: UserWork) => res + userWork.durationInSeconds, 0)
);

export const totalTimeSpentToday = createSelector(totalTimeSpentTodayInSeconds, seconds =>
  convertSecondsToDurationWithLocal(seconds)
);

export const userWorksGroupedByProject = createSelector(lastUserWorks, state => groupBy(state.list, 'projectId'));

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

export const timeSpentByProjectId = createSelector(timeSpentByProjectIdInSeconds, getSeconds => (projectId: number) =>
  convertSecondsToDurationWithLocal(getSeconds(projectId))
);

export const timePercentByProjectId = createSelector(
  [totalTimeSpentTodayInSeconds, timeSpentByProjectIdInSeconds],
  (totalSec, getProjectSec) => (projectId: number): string | number =>
    totalSec ? Math.floor((getProjectSec(projectId) / totalSec) * 100) : '...'
);
