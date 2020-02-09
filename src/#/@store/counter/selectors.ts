import { createSelector } from 'reselect';

const baseState = state => state.counter;

export const counterState = createSelector(
  baseState,
  s => s.counter
);
