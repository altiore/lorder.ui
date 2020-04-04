import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.asyncReducers;

export const asyncReducersList = createDeepEqualSelector(baseState, s => s.list);
