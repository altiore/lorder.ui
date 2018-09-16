import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { Identity, IIdentityRole } from './Identity';

const baseState = (state: IState) => state.identity;

export const isAuth = createSelector(baseState, (state: Identity): boolean => state.isAuth);

export const userRole = createSelector(baseState, (state: Identity): IIdentityRole => state.role);

export const userBearerKey = createSelector(baseState, (state: Identity): string => state.bearerKey);
