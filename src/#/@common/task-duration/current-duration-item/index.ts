import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import TaskDuration from '@components/task-duration';

import { currentTimerTime } from '#/@store/timer';

const mapStateToProps = createStructuredSelector({
  time: currentTimerTime,
} as any);

export default connect<any, any, any>(mapStateToProps)(TaskDuration);
