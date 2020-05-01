import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.projectStatusMoves;

export const taskStatusMoves = createDeepEqualSelector(baseState, s => s.list);
