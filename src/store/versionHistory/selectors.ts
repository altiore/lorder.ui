import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { VersionHistory } from './VersionHistory';

const baseState = (state: IState) => state.versionHistory;

export const version = createSelector(baseState, (state: VersionHistory): string => state.version);
