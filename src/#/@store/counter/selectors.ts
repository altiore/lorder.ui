import { createDeepEqualSelector } from '#/@store/@common/createSelector';

const baseState = state => state.counter;

export const counterState = createDeepEqualSelector(baseState, s => s.counter);
