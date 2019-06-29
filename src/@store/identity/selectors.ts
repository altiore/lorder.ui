import { createSelector } from 'reselect';

import { IState, ROLE } from '@types';
import { IIdentityState } from './Identity';

const baseState = (state: IState): IIdentityState => state.identity;

export const isAuth = createSelector(
  [baseState],
  state => state.isAuth
);

export const userRole = createSelector<any, any, undefined | ROLE>(
  [baseState],
  state => state.role
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
