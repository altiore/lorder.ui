import { createSelector } from 'reselect';

import { IState } from '@types';

const baseState = (state: IState) => state.info;

export const infoActivity = createSelector(
  baseState,
  s => s.activity
);

export const infoPeople = createSelector(
  baseState,
  s => s.people
);

export const infoProjects = createSelector(
  baseState,
  s => s.projects
);
