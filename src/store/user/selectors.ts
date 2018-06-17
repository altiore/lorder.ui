import { createSelector } from 'reselect';

import { IState } from '../rootReducer';
import { IUserRole, User } from './User';

const baseState = (state: IState) => state.user;

export const userRole = createSelector(baseState, (state: User): IUserRole => state.role);
