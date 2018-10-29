import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { covertSecondsToDuration } from 'src/store/@common/helpers';

const baseState = (state: IState) => state.timer;

export const currentTime = createSelector(baseState, state => state.time);

export const currentTimeHumanize = createSelector(currentTime, time => covertSecondsToDuration(time));

export const currentUserWorkId = createSelector(baseState, state => state.userWorkId);

export const currentUserWorkData = createSelector(baseState, state => ({
  projectId: state.projectId,
  taskId: state.taskId,
  userWorkId: state.userWorkId,
}));

export const isTimerStarted = createSelector(baseState, state => !!state.timer);
