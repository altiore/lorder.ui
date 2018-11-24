import map from 'lodash-es/map';

export type IUiProperty = 'isMagicLoginForm' | 'isLeftBarOpen';

export interface IUiState {
  isMagicLoginForm: boolean;
  isLeftBarOpen: boolean;
}

export class Ui implements IUiState {
  readonly isMagicLoginForm: boolean = false;
  readonly isLeftBarOpen: boolean = true;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
