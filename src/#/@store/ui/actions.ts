import { Moment } from 'moment';
import { createAction } from 'redux-actions';

import { IRangeFilter, UI_PROP } from './Ui';

export const toggleUiSetting = createAction<UI_PROP>('UI/TOGGLE_SETTING');

export const changeRangeFilter = createAction<IRangeFilter>('UI/CHANGE_RANGE_FILTER');

export interface IP {
  range: [Moment, Moment];
  userWorkId?: number;
}
export const changeCustomRange = createAction<IP, [Moment, Moment], number | undefined>(
  'UI/CHANGE_CUSTOM_DAY',
  (range, userWorkId) => ({ range, userWorkId })
);

export const changeCustomWeek = createAction<[Moment, Moment]>('UI/CHANGE_CUSTOM_WEEK');
