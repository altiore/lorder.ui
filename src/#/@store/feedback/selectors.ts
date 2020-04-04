import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.feedback;

export const feedbackList = createDeepEqualSelector(baseState, s => s.list);
