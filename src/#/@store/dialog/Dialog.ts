import map from 'lodash/map';

import { DialogProps } from '@material-ui/core/Dialog';

export interface IDialog {
  isOpened: boolean;
  dialogProps?: Partial<DialogProps>;
  props?: any;
}

export interface IDialogState {
  counter: number;
  dialogs: IDialog[];
  lastProps?: any;
}

export class Dialog implements IDialogState {
  counter: number = 0;
  dialogs: IDialog[] = [];
  lastProps?: any;

  constructor(initial?: Dialog) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
