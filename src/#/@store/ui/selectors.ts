import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IUiState } from './Ui';

import { IState } from '@types';

const baseState = (state: IState): IUiState => state.ui;

export const isMagicLoginForm = createDeepEqualSelector(
  baseState,
  (state: IUiState): boolean => state.isMagicLoginForm
);

export const isLeftBarOpen: any = createDeepEqualSelector(baseState, state => state.isLeftBarOpen);

export const isBoardFilterOpened = createDeepEqualSelector(baseState, state => state.isBoardFilterOpened);
