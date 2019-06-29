import { createSelector } from 'reselect';

import { IState } from '@types';
import { IUiState } from './Ui';

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
