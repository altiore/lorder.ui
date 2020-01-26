import { createSelector } from 'reselect';

import { IExternalLibraries, IState } from '@types';

const baseState = (state: IState): IExternalLibraries => state.externalLibraries;

export const externalLibrariesInit = createSelector(
  baseState,
  (state): boolean => Boolean(state.init)
);
