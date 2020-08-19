import moment from 'moment';

import { IRangeFilter } from './Ui';

export const RANGE_FROM_RANGE_FILTER: { [key in IRangeFilter]: [moment.Moment, moment.Moment] } = {
  [IRangeFilter.TODAY]: [moment().startOf('day'), moment()],
  [IRangeFilter.YESTERDAY]: [
    moment()
      .subtract(1, 'day')
      .startOf('day'),
    moment()
      .startOf('day')
      .subtract(1, 'second'),
  ],
  [IRangeFilter.LAST_WEEK]: [moment().startOf('isoWeek'), moment()],
  [IRangeFilter.LAST_MONTH]: [moment().startOf('month'), moment()],
};
