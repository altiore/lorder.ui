import map from 'lodash-es/map';
import { ComponentClass, FunctionComponent } from 'react';

export interface IDialogState {
  isOpened: boolean;
  children?: string | FunctionComponent | ComponentClass;
}

export class Dialog implements IDialogState {
  readonly isOpened: boolean = false;
  readonly children?: string | FunctionComponent | ComponentClass;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
