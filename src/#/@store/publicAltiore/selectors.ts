import get from 'lodash/get';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { Member } from '#/@store/projects/members/Member';

import { ACCESS_LEVEL, IPublicProject, IState } from '@types';

export const publicAltioreData = (state: IState): IPublicProject => state.publicAltiore;

export const isPublicAltioreLoaded = createDeepEqualSelector(publicAltioreData, s => s.isLoaded);

export const isPublicAltioreLoading = createDeepEqualSelector(publicAltioreData, s => s.isLoading);

export const altioreProject = createDeepEqualSelector(publicAltioreData, s => s.project);

export const altioreMembers = createDeepEqualSelector(altioreProject, s => get(s, 'members', []) as Member[]);

export const altioreHighLevelMembers = createDeepEqualSelector(altioreMembers, list =>
  list.filter(el => {
    return (
      el.accessLevel > ACCESS_LEVEL.RED && get(el, ['member', 'avatar', 'url']) && get(el, ['member', 'displayName'])
    );
  })
);
