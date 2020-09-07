import map from 'lodash/map';
import { Moment } from 'moment';

import { RANGE_FROM_RANGE_FILTER } from './consts';

export enum UI_PROP {
  MAGIC_LOGIN_FORM = 'isMagicLoginForm',
  TIME_EDIT = 'isTimeEdit',
  LEFT_BAR_OPEN = 'isLeftBarOpen',
  BOARD_FILTER_OPEN = 'isBoardFilterOpened',
}

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
  isTimeEdit: boolean;
  rangeFilter: IRangeFilter;
  customRange: [Moment, Moment | undefined];
  userWorkId?: number;
}

export class Ui implements IUiState {
  readonly isBoardFilterOpened: boolean = false;
  readonly isMagicLoginForm: boolean = false;
  readonly isLeftBarOpen: boolean = true;
  readonly isTimeEdit: boolean = false;
  rangeFilter: IRangeFilter = IRangeFilter.TODAY;
  customRange: [Moment, Moment | undefined] = RANGE_FROM_RANGE_FILTER[IRangeFilter.TODAY];
  userWorkId?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
