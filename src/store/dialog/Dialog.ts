import { DialogProps } from '@material-ui/core/Dialog';
import map from 'lodash-es/map';

export interface IDialogState {
  isOpened: boolean;
  dialogProps?: Partial<DialogProps>;
  props?: any;
}

export class Dialog implements IDialogState {
  readonly isOpened: boolean = false;
  readonly dialogProps?: Partial<DialogProps> = {};
  readonly props?: any;

  constructor(initial?: Dialog) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
