import { ReactNode } from 'react';

import { createAction } from 'redux-actions';

import { DialogProps } from '@material-ui/core/Dialog';

export let dialogComponents: ReactNode[] = [];
let timer: any = null;

export const openDialog = createAction<any, Partial<DialogProps>>(
  'DIALOG/OPEN',
  (p: ReactNode, _, props?: any) => {
    if (timer) {
      return undefined;
    } else {
      const index = dialogComponents.length;
      dialogComponents.push(p);
      return { index, props };
    }
  },
  (_, dialogProps: Partial<DialogProps>) => dialogProps
);

export const closeDialog = createAction('DIALOG/CLOSE', () => {
  timer = setTimeout(() => {
    dialogComponents.splice(-1, 1);
    clearTimeout(timer);
    timer = null;
  }, 500);
  return undefined;
});
