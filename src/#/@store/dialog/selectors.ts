import { createSelector } from 'reselect';

import { DialogProps } from '@material-ui/core/Dialog';

import { IDialogState } from './Dialog';

import { IState } from '@types';

const baseState = (state: IState) => state.dialog;

export const isDialogOpened = createSelector(
  baseState,
  (state: IDialogState): boolean => state.isOpened
);

export const dialogProps = createSelector(
  baseState,
  (state: IDialogState): Partial<DialogProps> | undefined => state.dialogProps
);

export const restProps = createSelector(
  baseState,
  (state: IDialogState): Partial<DialogProps> | undefined => state.props
);
