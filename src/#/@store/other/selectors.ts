import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.other;

export const otherCashResetAt = createDeepEqualSelector(baseState, s => s.cashResetAt);
