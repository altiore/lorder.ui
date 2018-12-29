import { DialogProps } from '@material-ui/core/Dialog';
import { ReactNode } from 'react';
import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { IDialogState } from './Dialog';

const baseState = (state: IState) => state.dialog;

export const isDialogOpened = createSelector(baseState, (state: IDialogState): boolean => state.isOpened);

export const dialogContent = createSelector(baseState, (state: IDialogState): ReactNode => state && state.children);

export const dialogProps = createSelector(
  baseState,
  (state: IDialogState): Partial<DialogProps> | undefined => state.dialogProps
);
