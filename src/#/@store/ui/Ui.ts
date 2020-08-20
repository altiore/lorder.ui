import map from 'lodash/map';
import { Moment } from 'moment';

import { RANGE_FROM_RANGE_FILTER } from './consts';

export type IUiProperty = 'isMagicLoginForm' | 'isLeftBarOpen';

export enum IRangeFilter {
  TODAY,
  YESTERDAY,
  LAST_WEEK,
  LAST_MONTH,
  CUSTOM_DAY,
  CUSTOM_WEEK,
}

export interface IUiState {
  isBoardFilterOpened: boolean;
  isMagicLoginForm: boolean;
  isLeftBarOpen: boolean;
  rangeFilter: IRangeFilter;
  customRange: [Moment, Moment];
}

export class Ui implements IUiState {
  readonly isBoardFilterOpened: boolean = false;
  readonly isMagicLoginForm: boolean = false;
  readonly isLeftBarOpen: boolean = true;
  rangeFilter: IRangeFilter = IRangeFilter.TODAY;
  customRange: [Moment, Moment] = RANGE_FROM_RANGE_FILTER[IRangeFilter.TODAY];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
