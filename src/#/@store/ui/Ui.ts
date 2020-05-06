import map from 'lodash/map';

export type IUiProperty = 'isMagicLoginForm' | 'isLeftBarOpen';

export interface IUiState {
  isBoardFilterOpened: boolean;
  isMagicLoginForm: boolean;
  isLeftBarOpen: boolean;
}

export class Ui implements IUiState {
  readonly isBoardFilterOpened: boolean = false;
  readonly isMagicLoginForm: boolean = false;
  readonly isLeftBarOpen: boolean = true;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
