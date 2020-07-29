import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { currentTask } from '#/@store/timer';
import { totalTimeSpentToday } from '#/@store/user-works';

import DailyRoutineMain from './DailyRoutineMain';

const mapStateToProps = createStructuredSelector({
  currentTask,
  hoursWorkedToday: totalTimeSpentToday,
} as any);

export default connect(mapStateToProps)(DailyRoutineMain) as any;
