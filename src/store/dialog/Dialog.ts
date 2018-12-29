import { DialogProps } from '@material-ui/core/Dialog';
import map from 'lodash-es/map';
import { ReactNode } from 'react';

export interface IDialogState {
  isOpened: boolean;
  children?: ReactNode;
  dialogProps?: Partial<DialogProps>;
}

export class Dialog implements IDialogState {
  readonly isOpened: boolean = false;
  readonly children?: ReactNode;
  readonly dialogProps?: Partial<DialogProps> = {};

  constructor(initial?: Dialog) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
