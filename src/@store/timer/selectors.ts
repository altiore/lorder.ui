import { createSelector } from 'reselect';

import { IState, IUserWork } from '@types';
import { convertSecondsToDuration, convertSecondsToDurationWithLocal } from '@store/@common/helpers';
import { filteredTaskList } from '@store/tasks/selectors';
import { IUserWorkDelete } from '../tasks/user-works';

const baseState = (state: IState) => state.timer;

export const currentTimerTime = createSelector(
  baseState,
  state => state.time
);

export const currentProjectId = createSelector(
  baseState,
  state => state.projectId
);

export const currentTaskId = createSelector(
  baseState,
  state => state.taskId
);

export const currentUserWorkId = createSelector(
  baseState,
  state => state.userWorkId
);

export const currentUserWorkData = createSelector(
  baseState,
  (state): IUserWorkDelete => ({
    projectId: state.projectId as number,
    taskId: state.taskId as number,
    userWorkId: state.userWorkId as number,
  })
);

export const isTimerStarted = createSelector(
  baseState,
  state => !!state.timer
);

export const currentTask = createSelector(
  [filteredTaskList, currentTaskId],
  (tasks, taskId) => tasks.find(el => el.id === taskId)
);

export const currentUserWork = createSelector(
  [currentTask, currentUserWorkId],
  (task, userWorkId) => task && task.userWorks.find((el: IUserWork) => el.id === userWorkId)
);

export const currentTime = createSelector(
  [currentTimerTime, currentUserWork],
  (time, userWork) => (userWork ? userWork.durationInSeconds : time)
);

export const currentTimeHumanize = createSelector(
  currentTime,
  time => convertSecondsToDuration(time)
);

export const currentTaskTime = createSelector(
  [currentTime, currentTask, currentUserWork],
  (time, task, userWork) => (task && userWork ? task.durationInSeconds : time)
);

export const currentTimeToString = createSelector(
  [currentTime],
  seconds => {
    return convertSecondsToDuration(seconds);
  }
);

export const currentTimeWithLocal = createSelector(
  [currentTime],
  seconds => convertSecondsToDurationWithLocal(seconds)
);
