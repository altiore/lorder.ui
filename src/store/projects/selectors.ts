import { createSelector } from 'reselect';

import { IState } from '../rootReducer';
import { IProjectState } from './Project'

const baseState = (state: IState) => state.projects;

export const projectTitle = createSelector(baseState, (state: IProjectState): boolean => !!state.title);
