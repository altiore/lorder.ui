import { createAction } from 'redux-actions';

import { IRangeFilter, IUiProperty } from './Ui';

export const toggleUiSetting = createAction<IUiProperty>('UI/TOGGLE_SETTING');

export const changeRangeFilter = createAction<IRangeFilter>('UI/CHANGE_RANGE_FILTER');
