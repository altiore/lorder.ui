import { DialogProps } from '@material-ui/core/Dialog';
import { ReactNode } from 'react';
import { ActionMeta, handleActions } from 'redux-actions';

import { closeDialog, openDialog } from './actions';
import { Dialog, IDialogState } from './Dialog';

type S = IDialogState;
type P = ReactNode;
type M = Partial<DialogProps>;

const closeDialogHandler = (state: S): S => {
  return new Dialog({
    ...state,
    children: null,
    dialogProps: {},
    isOpened: false,
  });
};

const openDialogHandler = (state: S, { payload, meta }: ActionMeta<P, M>): S => {
  return new Dialog({
    children: payload,
    dialogProps: meta,
    isOpened: true,
  });
};

export const dialog = handleActions<S, P>(
  {
    [closeDialog.toString()]: closeDialogHandler,
    [openDialog.toString()]: openDialogHandler,
  },
  new Dialog()
);
