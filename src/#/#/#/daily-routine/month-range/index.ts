import { connect } from 'react-redux';

import { changeCustomWeek } from '#/@store/ui';

import { MonthRangeTsx } from './month-range';

const mapDispatch = {
  changeCustomWeek,
};

export default connect(undefined, mapDispatch)(MonthRangeTsx);
