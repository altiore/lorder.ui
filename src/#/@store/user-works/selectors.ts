import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { convertSecondsToDurationWithLocal } from '#/@store/@common/helpers';
import { defaultProjectId, userId } from '#/@store/identity';
import { currentTaskId, currentTimerTime, currentUserWorkId } from '#/@store/timer';

import { UserWork } from './UserWork';

import { IState, IUserWork } from '@types';

const DATE_FORMAT = 'YYYY:MM:DD';

export const lastUserWorks = (state: IState): any => state.userWorks;

export const currentUserWorks = createDeepEqualSelector([lastUserWorks, userId], (s, currentUserId) =>
  s.list.filter(el => el.userId === currentUserId)
);

export const todayUserWorksWithoutDefault = createDeepEqualSelector(
  [currentUserWorks, defaultProjectId],
  (state, defProjectId) =>
    state.filter(
      el =>
        (el.projectId || get(el, ['task', 'projectId'])) !== defProjectId &&
        (!el.finishAt || moment().format(DATE_FORMAT) === el.finishAt.format(DATE_FORMAT))
    )
);

export const totalTimeSpentTodayInSeconds = createDeepEqualSelector(
  [todayUserWorksWithoutDefault, currentTimerTime],
  (list, currentTimerSeconds) =>
    list.reduce((res, userWork: UserWork) => {
      if (userWork.startAt.format(DATE_FORMAT) === moment().format(DATE_FORMAT)) {
        return res + get(userWork, 'durationInSeconds', 0);
      } else {
        if (userWork.finishAt) {
          return res + userWork.finishAt.diff(moment().startOf('day'), 'second');
        } else {
          return res + currentTimerSeconds;
        }
      }
    }, 0)
);

export const totalTimeSpentToday = createDeepEqualSelector(totalTimeSpentTodayInSeconds, seconds =>
  convertSecondsToDurationWithLocal(seconds, 24)
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
      return res + get(userWork, 'durationInSeconds', 0);
    }, 0)
);

export const timeSpentByProjectId = createDeepEqualSelector(
  timeSpentByProjectIdInSeconds,
  getSeconds => (projectId: number) => convertSecondsToDurationWithLocal(getSeconds(projectId), 8)
);

export const timePercentByProjectId = createDeepEqualSelector(
  [totalTimeSpentTodayInSeconds, timeSpentByProjectIdInSeconds],
  (totalSec, getProjectSec) => (projectId: number): string | number =>
    totalSec ? Math.floor((getProjectSec(projectId) / totalSec) * 100) : '...'
);

export const getUserWorksByTaskId = createDeepEqualSelector([lastUserWorks], s => (taskId: number) =>
  s.list.filter(el => el.taskId === taskId)
);

export const currentUserWork = createDeepEqualSelector([currentUserWorks, currentUserWorkId], (list, userWorkId) =>
  list.find((el: IUserWork) => el.id === userWorkId)
);

export const isPaused = createDeepEqualSelector(
  [currentUserWork, currentTaskId],
  (uw, taskId) => uw && uw.taskId !== taskId
);
