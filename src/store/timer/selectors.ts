import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { covertSecondsToDuration } from 'src/store/@common/helpers';

const baseState = (state: IState) => state.timer;

export const currentTime = createSelector(baseState, state => state.time);

export const currentTimeHumanize = createSelector(currentTime, time => covertSecondsToDuration(time));

export const currentTaskId = createSelector(baseState, state => state.taskId);
