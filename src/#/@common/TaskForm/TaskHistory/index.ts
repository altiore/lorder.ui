import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchTaskLogs, taskLogs } from '#/@store/task-active';
import { IState } from '@types';
import { ITaskHistoryProps, TaskHistoryTsx } from './TaskHistory';

const mapState = createStructuredSelector<IState, Partial<ITaskHistoryProps>>({
  taskLogs,
});

const mapDispatch = {
  fetchTaskLogs,
};

export default connect(
  mapState,
  mapDispatch
)(TaskHistoryTsx);
