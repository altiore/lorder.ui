import { createSelector } from 'reselect';

import { IState } from 'src/@types';

const baseState = (state: IState) => state.feedbacks;

export const feedbacksList = createSelector(baseState, s => s.list);
