import { DialogProps } from '@material-ui/core/Dialog';
import { ReactNode } from 'react';
import { createAction } from 'redux-actions';

export let CurrentDialog: ReactNode = null;

export const openDialog = createAction<string, Partial<DialogProps>>(
  'DIALOG/OPEN',
  (p: ReactNode) => {
    CurrentDialog = p;
    return 'component';
  },
  (_, dialogProps: Partial<DialogProps>) => dialogProps
);

export const closeDialog = createAction('DIALOG/CLOSE');
