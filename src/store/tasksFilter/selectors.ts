import { createSelector } from 'reselect';

import { IState } from 'src/@types';

const baseState = (state: IState) => state.tasksFilter;

export const tasksFilter = createSelector(baseState, state => state.filter);
