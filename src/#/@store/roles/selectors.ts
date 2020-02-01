import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.roles;

export const rolesList = createSelector(
  baseState,
  s => s.list
);
