import { createSelector } from 'reselect';

import { IState } from '../rootReducer';
import { Identity, IIdentityRole } from './Identity';

const baseState = (state: IState) => state.identity;

export const userRole = createSelector(baseState, (state: Identity): IIdentityRole => state.role);

export const userToken = createSelector(baseState, (state: Identity): string => state.token);
