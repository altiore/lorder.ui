import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IIdentityState } from './Identity';

import { IState, ROLE } from '@types';

const baseState = (state: IState): IIdentityState => state.identity;

export const isAuth = createDeepEqualSelector([baseState], state => state.isAuth);

export const userRole = createDeepEqualSelector<any, any, ROLE>([baseState], (state): ROLE => state.role);

export const userId = createDeepEqualSelector([baseState], state => state.id);

export const userBearerKey = createDeepEqualSelector([baseState], state => state.bearerKey);

export const userEmail = createDeepEqualSelector([baseState], state => state.email);

export const userAvatar = createDeepEqualSelector([baseState], state => state.avatar);

export const userIsLoading = createDeepEqualSelector([baseState], state => state.isLoading);

export const defaultProjectId = createDeepEqualSelector(baseState, state => state.defaultProjectId);

export const hasRole = createDeepEqualSelector([userRole], role => (r: ROLE | ROLE[]) => {
  const roles = Array.isArray(r) ? r : [r];
  if (role && ~roles.indexOf(role)) {
    return true;
  }
  return false;
});

export const initialProfileFormData = createDeepEqualSelector([baseState], state => ({
  displayName: state.displayName,
  tel: state.tel,
}));
