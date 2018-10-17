import { createSelector } from 'reselect';

import { IState } from 'src/@types';

const baseState = (state: IState) => state.project;

export const selectedProjectId = createSelector(baseState, (state: { selected?: number }) => state.selected);
