import { DialogProps } from '@material-ui/core/Dialog';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IDialogState } from './Dialog';

import { IState } from '@types';

const baseState = (state: IState) => state.dialog;

export const isDialogOpened = createDeepEqualSelector(baseState, (state: IDialogState): boolean => state.isOpened);

export const dialogProps = createDeepEqualSelector(
  baseState,
  (state: IDialogState): Partial<DialogProps> => state.dialogProps || {}
);

export const internalProps = createDeepEqualSelector(
  baseState,
  (state: IDialogState): Partial<DialogProps> => state.props || {}
);
