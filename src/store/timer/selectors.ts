import { createSelector } from 'reselect';

import { IState } from 'src/@types';

const baseState = (state: IState) => state.timer;

export const currentTime = createSelector(baseState, state => state.time);

export const currentTaskId = createSelector(baseState, state => state.taskId);
