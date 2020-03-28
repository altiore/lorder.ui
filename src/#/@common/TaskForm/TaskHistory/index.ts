import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchTaskLogs, taskLogs } from '#/@store/task-active';

import { ITaskHistoryProps, TaskHistoryTsx } from './TaskHistory';

import { IState } from '@types';

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
