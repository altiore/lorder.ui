import { Moment } from 'moment';
import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist';

import { changeCustomRange, changeCustomWeek, changeRangeFilter, IP, toggleUiSetting } from './actions';
import { RANGE_FROM_RANGE_FILTER } from './consts';
import { IRangeFilter, IUiState, Ui, UI_PROP } from './Ui';

const rehydrateHandler = (state, { payload }) => {
  return new Ui({
    ...state,
    ...(payload?.ui || {}),
    customRange: RANGE_FROM_RANGE_FILTER[IRangeFilter.TODAY],
    userWorkId: undefined,
  });
};

const changeCustomRangeHandler = (state: IUiState, { payload }: { payload: IP }) => {
  return new Ui({
    ...state,
    customRange: payload.range,
    rangeFilter: IRangeFilter.CUSTOM_DAY,
    userWorkId: payload.userWorkId || undefined,
  });
};

const changeCustomWeekHandler = (state: IUiState, { payload }: { payload: [Moment, Moment] }) => {
  return new Ui({
    ...state,
    customRange: payload,
    rangeFilter: IRangeFilter.CUSTOM_WEEK,
    userWorkId: undefined,
  });
};

const changeRangeFilterHandler = (state: IUiState, { payload }: { payload: IRangeFilter }) => {
  return new Ui({
    ...state,
    customRange: RANGE_FROM_RANGE_FILTER[payload],
    rangeFilter: payload,
    userWorkId: undefined,
  });
};

const toggleUiSettingHandler = (state: IUiState, { payload }: { payload: UI_PROP }) => {
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
