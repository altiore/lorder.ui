import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
  createTaskStatus,
  deleteManyTaskStatuses,
  deleteTaskStatus,
  fetchTaskStatuses,
  taskStatusesList,
} from '#/@store/task-statuses';

import { TaskStatuses } from './task.statuses';

const mapState = createStructuredSelector({
  list: taskStatusesList,
} as any);

const dispatchState = {
  createItem: createTaskStatus,
  deleteBulk: deleteManyTaskStatuses,
  deleteItem: deleteTaskStatus,
  fetchItems: fetchTaskStatuses,
};

export default connect(mapState, dispatchState)(TaskStatuses);
