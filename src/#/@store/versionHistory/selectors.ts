import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { VersionHistory } from './VersionHistory';

import { IState } from '@types';

const baseState = (state: IState) => state.versionHistory;

export const version = createDeepEqualSelector(baseState, (state: VersionHistory): string | undefined => state.version);
