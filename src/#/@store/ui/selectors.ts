import { createSelector } from 'reselect';

import { IUiState } from './Ui';

import { IState } from '@types';

const baseState = (state: IState): IUiState => state.ui;

export const isMagicLoginForm = createSelector(
  baseState,
  (state: IUiState): boolean => state.isMagicLoginForm
);

export const isLeftBarOpen: any = createSelector(
  baseState,
  state => state.isLeftBarOpen
);

export const isBoardFilterOpened = createSelector(
  baseState,
  state => state.isBoardFilterOpened
);
