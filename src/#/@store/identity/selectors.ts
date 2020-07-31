import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IIdentityState } from './Identity';

import { IState, ROLE } from '@types';

export const baseIdentityState = (state: IState): IIdentityState => state.identity;

export const isAuth = createDeepEqualSelector([baseIdentityState], state => state.isAuth);

export const userRole = createDeepEqualSelector<any, any, ROLE>([baseIdentityState], (state): ROLE => state.role);

export const userId = createDeepEqualSelector([baseIdentityState], state => state.id);

export const userRefreshToken = createDeepEqualSelector([baseIdentityState], state => state.refreshToken);

export const userExpiresIn = createDeepEqualSelector([baseIdentityState], state => state.expiresIn);

export const userIsRefreshing = createDeepEqualSelector([baseIdentityState], state => state.isRefreshing);

export const userEmail = createDeepEqualSelector([baseIdentityState], state => state.email);

export const userAvatar = createDeepEqualSelector([baseIdentityState], state => state.avatar);

export const userIsLoading = createDeepEqualSelector([baseIdentityState], state => state.isLoading);

export const defaultProjectId = createDeepEqualSelector(baseIdentityState, state => state.defaultProjectId);

export const hasRole = createDeepEqualSelector([userRole], role => (r: ROLE | ROLE[]) => {
  const roles = Array.isArray(r) ? r : [r];
  if (role && ~roles.indexOf(role)) {
    return true;
  }
  return false;
});

export const userDisplayName = createDeepEqualSelector([baseIdentityState], s => s?.displayName);

export const initialProfileFormData = createDeepEqualSelector([baseIdentityState], state => ({
  displayName: state?.displayName,
  tel: state?.tel,
}));
