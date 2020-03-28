import { createSelector } from 'reselect';

import { IIdentityState } from './Identity';

import { IState, ROLE } from '@types';

const baseState = (state: IState): IIdentityState => state.identity;

export const isAuth = createSelector(
  [baseState],
  state => state.isAuth
);

export const userRole = createSelector<any, any, ROLE>(
  [baseState],
  (state): ROLE => state.role
);

export const userId = createSelector(
  [baseState],
  state => state.id
);

export const userBearerKey = createSelector(
  [baseState],
  state => state.bearerKey
);

export const userEmail = createSelector(
  [baseState],
  state => state.email
);

export const userAvatar = createSelector(
  [baseState],
  state => state.avatar
);

export const userIsLoading = createSelector(
  [baseState],
  state => state.isLoading
);

export const defaultProjectId = createSelector(
  baseState,
  state => state.defaultProjectId
);

export const hasRole = createSelector(
  [userRole],
  role => (r: ROLE | ROLE[]) => {
    const roles = Array.isArray(r) ? r : [r];
    if (role && ~roles.indexOf(role)) {
      return true;
    }
    return false;
  }
);

export const initialProfileFormData = createSelector(
  [baseState],
  state => ({
    displayName: state.displayName,
    tel: state.tel,
  })
);
