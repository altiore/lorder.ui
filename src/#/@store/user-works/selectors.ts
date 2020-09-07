import get from 'lodash/get';
import moment from 'moment';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { convertSecondsToHours } from '#/@store/@common/helpers';
import { defaultProjectId, userId } from '#/@store/identity';
import { getTaskById } from '#/@store/tasks';
import { currentProjectId, currentTaskId, currentTimerTime, currentUserWorkId } from '#/@store/timer';
import { currentRange, IRangeFilter, RANGE_FROM_RANGE_FILTER } from '#/@store/ui';

import { IEvent, IState, ITask, IUserWork } from '@types';
import { durationFromUserWorkList } from '@utils/duration.from.user-work.list';

export const lastUserWorks = (state: IState): any => state.userWorks;

export const lastUserWorksList = createDeepEqualSelector(lastUserWorks, s => s.list);

export const currentUserWorks = createDeepEqualSelector([lastUserWorks, userId], (s, currentUserId) =>
  s.list.filter(el => el.userId === currentUserId)
);

export const getUserWorksInRange = createDeepEqualSelector(
  [lastUserWorksList, defaultProjectId],
  (list, defId) => (startTime: moment.Moment, finishTime: moment.Moment = moment()) =>
    list.filter((el: IUserWork) => {
      return el.projectId !== defId && (el.finishAt || moment()).diff(startTime) > 0 && finishTime.diff(el.startAt) > 0;
    })
);

export const getUserWorkById = createDeepEqualSelector([lastUserWorks], s => (uwId: number) =>
  s.list.find(el => el.id === uwId)
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

export const isRelax = createDeepEqualSelector(
  [currentProjectId, defaultProjectId],
  (curPId, defPId) => curPId === defPId
);

export const inProgress = createDeepEqualSelector(isPaused, i => !i);

export const filteredEvents = createDeepEqualSelector(
  [lastUserWorksList, getTaskById, defaultProjectId, currentRange],
  (userWorks: IUserWork[], getTask, defPrId: number | undefined, range): IEvent[] => {
    return userWorks
      .filter((uw: IUserWork) => {
        return (uw.finishAt || moment()).diff(range[0]) > 0 && (range[1] || moment()).diff(uw.startAt) > 0;
      })
      .sort((a, b) => (a.startAt.unix() > b.startAt.unix() ? 1 : -1))
      .map(userWork => {
        const task = getTask(userWork.taskId) as ITask;
        return {
          userWork,

          task,

          isActive: (userWork.projectId || (task && task.projectId)) !== defPrId,
          name: get(task, 'title', userWork.taskId.toString()),
        };
      });
  }
);

export const currentTimeDependentOnTimer = createDeepEqualSelector([currentTimerTime], curTime => {
  if (curTime) {
    return moment().format('HH:mm');
  }

  return moment().format('HH:mm');
});

export const todayUserWorksWithoutDefault = createDeepEqualSelector([getUserWorksInRange], getList =>
  getList(...RANGE_FROM_RANGE_FILTER[IRangeFilter.TODAY])
);

export const totalTimeSpentToday = createDeepEqualSelector(
  [todayUserWorksWithoutDefault, currentTimerTime],
  (list, currentTimerSeconds) =>
    convertSecondsToHours(
      durationFromUserWorkList(list, currentTimerSeconds, ...RANGE_FROM_RANGE_FILTER[IRangeFilter.TODAY])
    )
);

export const lastWeekUserWorksWithoutDefault = createDeepEqualSelector([getUserWorksInRange], getList =>
  getList(...RANGE_FROM_RANGE_FILTER[IRangeFilter.LAST_WEEK])
);

export const lastWeekTimeSpentToday = createDeepEqualSelector(
  [lastWeekUserWorksWithoutDefault, currentTimerTime],
  (list, currentTimerSeconds) =>
    convertSecondsToHours(
      durationFromUserWorkList(list, currentTimerSeconds, ...RANGE_FROM_RANGE_FILTER[IRangeFilter.LAST_WEEK])
    )
);
