import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.other;

export const otherCashResetAt = createSelector(
  baseState,
  s => s.cashResetAt
);
