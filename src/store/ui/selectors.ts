import { createSelector } from 'reselect';

import { IState } from '../rootReducer';
import { IUiState } from './Ui'

const baseState = (state: IState) => state.ui;

export const isMagicLoginForm = createSelector(baseState, (state: IUiState): boolean => state.isMagicLoginForm);
