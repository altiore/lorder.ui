import { createSelector } from 'reselect';

import { VersionHistory } from './VersionHistory';

import { IState } from '@types';

const baseState = (state: IState) => state.versionHistory;

export const version = createSelector(
  baseState,
  (state: VersionHistory): string | undefined => state.version
);
