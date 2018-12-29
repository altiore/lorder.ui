import { DialogProps } from '@material-ui/core/Dialog';
import map from 'lodash-es/map';

export interface IDialogState {
  isOpened: boolean;
  dialogProps?: Partial<DialogProps>;
}

export class Dialog implements IDialogState {
  readonly isOpened: boolean = false;
  readonly dialogProps?: Partial<DialogProps> = {};

  constructor(initial?: Dialog) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
