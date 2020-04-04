import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IExternalLibraries, IState } from '@types';

const baseState = (state: IState): IExternalLibraries => state.externalLibraries;

export const externalLibrariesInit = createDeepEqualSelector(baseState, (state): boolean => Boolean(state.init));
