import { DialogProps } from '@material-ui/core/Dialog';
import { createAction } from 'redux-actions';

export const openDialog = createAction<JSX.Element | object, Partial<DialogProps>>(
  'DIALOG/OPEN',
  (p: JSX.Element | object) => p,
  (_, dialogProps: Partial<DialogProps>) => dialogProps
);

export const closeDialog = createAction('DIALOG/CLOSE');
