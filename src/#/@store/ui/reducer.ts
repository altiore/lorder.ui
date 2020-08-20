import { Moment } from 'moment';
import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist';

import { changeCustomRange, changeCustomWeek, changeRangeFilter, toggleUiSetting } from './actions';
import { RANGE_FROM_RANGE_FILTER } from './consts';
import { IRangeFilter, IUiProperty, IUiState, Ui } from './Ui';

const rehydrateHandler = (state, { payload }) => {
  return new Ui({
    ...state,
    ...(payload?.ui || {}),
    customRange: RANGE_FROM_RANGE_FILTER[IRangeFilter.TODAY],
  });
};

const changeCustomRangeHandler = (state: IUiState, { payload }: { payload: [Moment, Moment] }) => {
  return new Ui({
    ...state,
    customRange: payload,
    rangeFilter: IRangeFilter.CUSTOM_DAY,
  });
};

const changeCustomWeekHandler = (state: IUiState, { payload }: { payload: [Moment, Moment] }) => {
  return new Ui({
    ...state,
    customRange: payload,
    rangeFilter: IRangeFilter.CUSTOM_WEEK,
  });
};

const changeRangeFilterHandler = (state: IUiState, { payload }: { payload: IRangeFilter }) => {
  return new Ui({
    ...state,
    customRange: RANGE_FROM_RANGE_FILTER[payload],
    rangeFilter: payload,
  });
};

const toggleUiSettingHandler = (state: IUiState, { payload }: { payload: IUiProperty }) => {
  return new Ui({
    ...state,
    [payload]: !state[payload],
  });
};

export const uiReducer = handleActions<IUiState, any, any>(
  {
    [REHYDRATE]: rehydrateHandler,
    [changeCustomRange.toString()]: changeCustomRangeHandler,
    [changeCustomWeek.toString()]: changeCustomWeekHandler,
    [changeRangeFilter.toString()]: changeRangeFilterHandler,
    [toggleUiSetting.toString()]: toggleUiSettingHandler,
  },
  new Ui()
);
