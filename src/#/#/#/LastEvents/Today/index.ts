import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { totalTimeSpentToday } from '#/@store/user-works';

import { TodayTsx } from './Today';

const mapStateToProps = createStructuredSelector({
  total: totalTimeSpentToday,
} as any);

export default connect(mapStateToProps)(TodayTsx) as any;
