import { connect } from 'react-redux';

import { changeCustomRange } from '#/@store/ui';

import { WeekRangeTsx } from './week-range';

const mapDispatch = {
  changeCustomRange,
};

export default connect(undefined, mapDispatch)(WeekRangeTsx);
