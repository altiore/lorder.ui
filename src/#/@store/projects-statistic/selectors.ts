import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.projectsPub;

export const projectPubList = createDeepEqualSelector(baseState, s => s.list);

export const projectPubIsLoading = createDeepEqualSelector(baseState, s => s.isLoading);
