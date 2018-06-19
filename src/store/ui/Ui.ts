import map from 'lodash-es/map'

export type IUiProperty = 'isMagicLoginForm'

export interface IUiState {
  isMagicLoginForm: boolean;
}

export class Ui implements IUiState {
  public readonly isMagicLoginForm: boolean = false;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
