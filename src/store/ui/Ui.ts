import map from 'lodash-es/map';

export type IUiProperty = 'isMagicLoginForm' | 'isLeftBarOpen';

export interface IUiState {
  isMagicLoginForm: boolean;
  isLeftBarOpen: boolean;
}

export class Ui implements IUiState {
  public readonly isMagicLoginForm: boolean = false;
  public readonly isLeftBarOpen: boolean = true;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
