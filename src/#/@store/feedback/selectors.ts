import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.feedback;

export const feedbackList = createSelector(
  baseState,
  s => s.list
);
