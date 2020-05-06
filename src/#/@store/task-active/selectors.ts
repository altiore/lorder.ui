import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.taskActive;

export const taskLogs = createDeepEqualSelector(baseState, s => s.taskLogs.list);
