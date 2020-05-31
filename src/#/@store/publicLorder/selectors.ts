import get from 'lodash/get';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { Member } from '#/@store/projects/members/Member';

import { ACCESS_LEVEL, IPublicProject, IState } from '@types';

export const publicLorderData = (state: IState): IPublicProject => state.publicLorder;

export const isPublicLorderLoaded = createDeepEqualSelector(publicLorderData, s => s.isLoaded);

export const isPublicLorderLoading = createDeepEqualSelector(publicLorderData, s => s.isLoading);

export const lorderProject = createDeepEqualSelector(publicLorderData, s => s.project);

export const lorderMembers = createDeepEqualSelector(lorderProject, s => get(s, 'members', []) as Member[]);

export const lorderHighLevelMembers = createDeepEqualSelector(lorderMembers, list =>
  list.filter(el => {
    return (
      el.accessLevel > ACCESS_LEVEL.RED && get(el, ['member', 'avatar', 'url']) && get(el, ['member', 'displayName'])
    );
  })
);
