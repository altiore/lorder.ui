import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { deleteTaskType, getAllTaskTypes, postTaskType, taskTypeList } from '#/@store/task-types';

import { TaskTypesJsx } from './TaskTypes';

const mapState = createStructuredSelector({
  list: taskTypeList,
} as any);

const mapDispatch = {
  deleteTaskType,
  getAllTaskTypes,
  postTaskType,
};

export default connect(
  mapState,
  mapDispatch
)(TaskTypesJsx);
