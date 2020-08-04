import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { ITaskHistoryProps, TaskHistoryTsx } from './task-history';

import { fetchTaskLogs, taskLogs } from '#/@store/task-active';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, Partial<ITaskHistoryProps>>({
  taskLogs,
});

const mapDispatch = {
  fetchTaskLogs,
};

export default connect(mapState, mapDispatch)(TaskHistoryTsx);
