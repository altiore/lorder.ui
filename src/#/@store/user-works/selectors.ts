import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { convertSecondsToDurationWithLocal } from '#/@store/@common/helpers';
import { defaultProjectId, userId } from '#/@store/identity';

import moment from 'moment';

import { UserWork } from './UserWork';

import { IState } from '@types';

const DATE_FORMAT = 'YYYY:MM:DD';

export const lastUserWorks = (state: IState): any => state.userWorks;

export const currentUserWorks = createDeepEqualSelector([lastUserWorks, userId], (s, currentUserId) =>
  s.list.filter(el => el.userId === currentUserId)
);

export const totalTimeSpentTodayInSeconds = createDeepEqualSelector(
  [currentUserWorks, defaultProjectId],
  (state, defProjectId) =>
    state
      .filter(
        el =>
          (el.projectId || get(el, ['task', 'projectId'])) !== defProjectId &&
          (!el.finishAt || moment().format(DATE_FORMAT) === el.finishAt.format(DATE_FORMAT))
      )
      .reduce((res, userWork: UserWork) => {
        if (userWork.startAt.format(DATE_FORMAT) === moment().format(DATE_FORMAT)) {
          return res + userWork.durationInSeconds;
        } else {
          return res + (userWork.finishAt || moment()).diff(moment().startOf('day'), 'second');
        }
      }, 0)
);

export const totalTimeSpentToday = createDeepEqualSelector(totalTimeSpentTodayInSeconds, seconds =>
  convertSecondsToDurationWithLocal(seconds)
);

export const userWorksGroupedByProject = createDeepEqualSelector(currentUserWorks, state =>
  groupBy(state.list, 'projectId')
);

export const getUserWorksByProjectId = createDeepEqualSelector(
  userWorksGroupedByProject,
  groupedUserWorks => (projectId: number) => groupedUserWorks[projectId] || []
);

export const timeSpentByProjectIdInSeconds = createDeepEqualSelector(
  getUserWorksByProjectId,
  getUserWorks => (projectId: number) =>
    getUserWorks(projectId).reduce((res: number, userWork: UserWork) => {
      return res + userWork.durationInSeconds;
    }, 0)
);

export const timeSpentByProjectId = createDeepEqualSelector(
  timeSpentByProjectIdInSeconds,
  getSeconds => (projectId: number) => convertSecondsToDurationWithLocal(getSeconds(projectId))
);

export const timePercentByProjectId = createDeepEqualSelector(
  [totalTimeSpentTodayInSeconds, timeSpentByProjectIdInSeconds],
  (totalSec, getProjectSec) => (projectId: number): string | number =>
    totalSec ? Math.floor((getProjectSec(projectId) / totalSec) * 100) : '...'
);

export const getUserWorksByTaskId = createDeepEqualSelector([lastUserWorks], s => (taskId: number) =>
  s.list.filter(el => el.taskId === taskId)
);
