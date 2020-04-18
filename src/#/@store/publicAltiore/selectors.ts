import get from 'lodash/get';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IPublicProject, IState } from '@types';

export const publicAltioreData = (state: IState): IPublicProject => state.publicAltiore;

export const isPublicAltioreLoaded = createDeepEqualSelector(publicAltioreData, s => s.isLoaded);

export const isPublicAltioreLoading = createDeepEqualSelector(publicAltioreData, s => s.isLoading);

export const altioreProject = createDeepEqualSelector(publicAltioreData, s => s.project);

export const altioreMembers = createDeepEqualSelector(altioreProject, s => get(s, 'members', []));
