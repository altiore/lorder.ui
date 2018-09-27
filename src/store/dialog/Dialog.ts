import map from 'lodash-es/map';
import { ComponentClass, StatelessComponent } from 'react';

export interface IDialogState {
  isOpened: boolean;
  children?: string | StatelessComponent | ComponentClass;
}

export class Dialog implements IDialogState {
  public readonly isOpened: boolean = false;
  public readonly children?: string | StatelessComponent | ComponentClass;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
