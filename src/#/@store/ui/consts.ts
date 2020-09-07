import moment from 'moment';

import { IRangeFilter } from './Ui';

export const RANGE_FROM_RANGE_FILTER: { [key in IRangeFilter]: [moment.Moment, moment.Moment | undefined] } = {
  [IRangeFilter.TODAY]: [moment().startOf('day'), undefined],
  [IRangeFilter.YESTERDAY]: [
    moment()
      .subtract(1, 'day')
      .startOf('day'),
    moment()
      .startOf('day')
      .subtract(1, 'second'),
  ],
  [IRangeFilter.LAST_WEEK]: [moment().startOf('isoWeek'), undefined],
  [IRangeFilter.LAST_MONTH]: [moment().startOf('month'), undefined],
  [IRangeFilter.CUSTOM_DAY]: [moment().startOf('day'), undefined],
  [IRangeFilter.CUSTOM_WEEK]: [moment().startOf('isoWeek'), undefined],
};
