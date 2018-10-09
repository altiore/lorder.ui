import { createSelector } from 'reselect';

import { IState, ROLE } from 'src/@types';
import { Identity } from './Identity';

const baseState = (state: IState) => state.identity;

export const isAuth = createSelector(baseState, (state: Identity): boolean => state.isAuth);

export const userRole = createSelector(baseState, (state: Identity): ROLE => state.role);

export const userBearerKey = createSelector(baseState, (state: Identity): string => state.bearerKey);
