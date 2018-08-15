import { createSelector } from 'reselect';

import { IState } from '../rootReducer';
import { IDialogState } from './Dialog'

const baseState = (state: IState) => state.dialog;

export const isDialogOpened = createSelector(baseState, (state: IDialogState): boolean => state.isOpened);

export const dialogContent = createSelector(baseState, (state: IDialogState): any => state && state.children);
