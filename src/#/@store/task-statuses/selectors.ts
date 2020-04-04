import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.taskStatuses;

export const taskStatusesList = createDeepEqualSelector(baseState, s => s.list);
