import { handleActions } from 'redux-actions';

import { toggleUiSetting } from './actions';
import { IUiProperty, IUiState, Ui } from './Ui';

const toggleUiSettingHandler = (state: IUiState, { payload }: { payload: IUiProperty }) => {
  return new Ui({
    ...state,
    [payload]: !state[payload],
  });
};

export const uiReducer: any = handleActions(
  {
    [toggleUiSetting.toString()]: toggleUiSettingHandler,
  } as any,
  new Ui()
);
