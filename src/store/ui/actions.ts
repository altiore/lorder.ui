import { createAction } from 'redux-actions';

import { IUiProperty } from './Ui'

export const toggleUiSetting = createAction<IUiProperty>('UI/TOGGLE_SETTING');
