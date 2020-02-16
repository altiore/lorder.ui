import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  createTaskStatus,
  deleteManyTaskStatuses,
  deleteTaskStatus,
  fetchTaskStatuses,
  taskStatusesList,
} from '#/@store/task-statuses';
import { TaskStatuses } from './TaskStatuses';

const mapState = createStructuredSelector({
  list: taskStatusesList,
} as any);

const dispatchState = {
  createItem: createTaskStatus,
  deleteItem: deleteTaskStatus,
  deleteBulk: deleteManyTaskStatuses,
  fetchItems: fetchTaskStatuses,
};

export default connect(
  mapState,
  dispatchState
)(TaskStatuses);
