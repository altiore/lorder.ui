import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.asyncReducers;

export const asyncReducersList = createSelector(
  baseState,
  s => s.list
);
