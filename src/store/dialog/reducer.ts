import { Action, handleActions } from 'redux-actions';

import { closeDialog, openDialog } from './actions';
import { Dialog, IDialogState } from './Dialog';

type S = IDialogState;
type P = any;

const closeDialogHandler = (state: S): S => {
  return new Dialog({
    ...state,
    children: null,
    isOpened: false,
  });
};

const openDialogHandler = (state: S, { payload }: Action<any>): S => {
  return new Dialog({
    ...state,
    children: payload,
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
