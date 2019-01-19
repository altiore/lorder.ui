import { createSelector } from 'reselect';

import { IState, ROLE } from 'src/@types';
import { Identity } from './Identity';

const baseState = (state: IState) => state.identity;

export const isAuth = createSelector(baseState, (state: Identity): boolean => state.isAuth);

export const userRole = createSelector(baseState, (state: Identity): ROLE => state.role);

export const userBearerKey = createSelector(baseState, (state: Identity): string => state.bearerKey);

export const userEmail = createSelector(baseState, (state: Identity): string => state.email);

export const userAvatar = createSelector(baseState, (state: Identity): string | undefined => state.avatar);

export const userIsLoading = createSelector(baseState, (state: Identity): boolean => state.isLoading);

export const defaultProjectId = createSelector(
  baseState,
  (state: Identity): number | undefined => state.defaultProjectId
);

export const hasRole = createSelector([userRole], role => (r: ROLE | ROLE[]) => {
  const roles = Array.isArray(r) ? r : [r];
  if (~roles.indexOf(role)) {
    return true;
  }
  return false;
});
