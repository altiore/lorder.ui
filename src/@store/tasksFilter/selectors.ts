import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.tasksFilter;

export const tasksFilter = createSelector(
  baseState,
  state => state.filter
);

export const searchTerm = createSelector(
  baseState,
  s => s.search
);

export const filteredMembers = createSelector(
  baseState,
  s => s.members
);
