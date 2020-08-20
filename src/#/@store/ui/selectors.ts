import moment from 'moment';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { RANGE_FROM_RANGE_FILTER } from './consts';
import { IRangeFilter, IUiState } from './Ui';

import { IState } from '@types';

const baseState = (state: IState): IUiState => state.ui;

export const isMagicLoginForm = createDeepEqualSelector(
  baseState,
  (state: IUiState): boolean => state.isMagicLoginForm
);

export const isLeftBarOpen: any = createDeepEqualSelector(baseState, state => state.isLeftBarOpen);

export const isBoardFilterOpened = createDeepEqualSelector(baseState, state => state.isBoardFilterOpened);

export const curRangeFilter = createDeepEqualSelector(baseState, state => state.rangeFilter);

export const currentRange = createDeepEqualSelector(
  [baseState],
  (s): [moment.Moment, moment.Moment] => s.customRange || RANGE_FROM_RANGE_FILTER[IRangeFilter.TODAY]
);

export const lastDayOfCustomRange = createDeepEqualSelector([currentRange], range =>
  range ? range[1] : RANGE_FROM_RANGE_FILTER[IRangeFilter.TODAY][1]
);
