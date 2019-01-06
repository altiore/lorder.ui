import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { IUiState } from './Ui';

const baseState = (state: IState) => state.ui;

export const isMagicLoginForm = createSelector(baseState, (state: IUiState): boolean => state.isMagicLoginForm);

export const isRequiredConfirmationChangedEvents = createSelector(
  baseState,
  (state: IUiState): boolean => state.isRequiredConfirmationChangedEvents
);

export const isLeftBarOpen = createSelector(baseState, (state: IUiState): boolean => state.isLeftBarOpen);
