import { createSelector } from 'reselect';

import { IState } from '@types';
import { VersionHistory } from './VersionHistory';

const baseState = (state: IState) => state.versionHistory;

export const version = createSelector(
  baseState,
  (state: VersionHistory): string | undefined => state.version
);
