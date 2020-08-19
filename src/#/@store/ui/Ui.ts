import map from 'lodash/map';

export type IUiProperty = 'isMagicLoginForm' | 'isLeftBarOpen';

export enum IRangeFilter {
  TODAY,
  YESTERDAY,
  LAST_WEEK,
  LAST_MONTH,
}

export interface IUiState {
  isBoardFilterOpened: boolean;
  isMagicLoginForm: boolean;
  isLeftBarOpen: boolean;
  rangeFilter: IRangeFilter;
}

export class Ui implements IUiState {
  readonly isBoardFilterOpened: boolean = false;
  readonly isMagicLoginForm: boolean = false;
  readonly isLeftBarOpen: boolean = true;
  rangeFilter: IRangeFilter = IRangeFilter.TODAY;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
