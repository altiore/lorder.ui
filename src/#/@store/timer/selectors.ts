import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { convertSecondsToDuration, convertSecondsToDurationWithLocal } from '#/@store/@common/helpers';
import { filteredTaskList } from '#/@store/tasks/selectors';
import { IUserWorkDelete } from '#/@store/user-works/actions';

import { IState, IUserWork } from '@types';

const baseState = (state: IState) => state.timer;

export const currentTimerTime = createDeepEqualSelector(baseState, state => state.time);

export const currentProjectId = createDeepEqualSelector(baseState, state => state.projectId);

export const currentTaskId = createDeepEqualSelector(baseState, state => state.taskId);

export const currentUserWorkId = createDeepEqualSelector(baseState, state => state.userWorkId);

export const currentUserWorkData = createDeepEqualSelector(
  baseState,
  (state): IUserWorkDelete => ({
    projectId: state.projectId as number,
    taskId: state.taskId as number,
    userWorkId: state.userWorkId as number,
  })
);

export const isTimerStarted = createDeepEqualSelector(baseState, state => !!state.timer);

export const currentTask = createDeepEqualSelector([filteredTaskList, currentTaskId], (tasks, taskId): any =>
  tasks.find(el => el.id === taskId)
);

export const currentUserWork = createDeepEqualSelector(
  [currentTask, currentUserWorkId],
  (task, userWorkId) =>
    task && task.userWorks && task.userWorks.find && task.userWorks.find((el: IUserWork) => el.id === userWorkId)
);

export const currentTimeHumanize = createDeepEqualSelector(currentTimerTime, time => convertSecondsToDuration(time));

export const currentTimeToString = createDeepEqualSelector([currentTimerTime], seconds =>
  convertSecondsToDuration(seconds)
);

export const currentTimeWithLocal = createDeepEqualSelector([currentTimerTime], seconds =>
  convertSecondsToDurationWithLocal(seconds)
);
