import { ReactNode } from 'react';

import { createAction } from 'redux-actions';

import { DialogProps } from '@material-ui/core/Dialog';

export let CurrentDialog: ReactNode = null;

export const openDialog = createAction<string, Partial<DialogProps>>(
  'DIALOG/OPEN',
  (p: ReactNode, _, props?: any) => {
    CurrentDialog = p;
    return props;
  },
  (_, dialogProps: Partial<DialogProps>) => dialogProps
);

export const closeDialog = createAction('DIALOG/CLOSE');

export const changeSettings = createAction('DIALOG/CHANGE_SETTINGS');
