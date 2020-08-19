import { handleActions } from 'redux-actions';

import { changeRangeFilter, toggleUiSetting } from './actions';
import { IRangeFilter, IUiProperty, IUiState, Ui } from './Ui';

const changeRangeFilterHandler = (state: IUiState, { payload }: { payload: IRangeFilter }) => {
  return new Ui({
    ...state,
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
    [changeRangeFilter.toString()]: changeRangeFilterHandler,
    [toggleUiSetting.toString()]: toggleUiSettingHandler,
  },
  new Ui()
);
