import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { todayUserWorksWithoutDefault, totalTimeSpentToday } from '#/@store/user-works';

import { TodayTsx } from './today';

const mapStateToProps = createStructuredSelector({
  todayUserWorks: todayUserWorksWithoutDefault,
  total: totalTimeSpentToday,
} as any);

export default connect(mapStateToProps)(TodayTsx) as any;
