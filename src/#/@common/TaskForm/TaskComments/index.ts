import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userId } from '#/@store/identity';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router';
import { removeTaskComment } from '#/@store/task-comments';
import { addTaskComment, fetchTaskComments } from '#/@store/task-comments';
import { getTaskIdBySequenceNumber } from '#/@store/tasks';

import { TaskComments } from './TaskComments';

const mapStateToProps = createStructuredSelector({
  getTaskIdBySequenceNumber,
  projectId: routeProjectId,
  sequenceNumber: routeTaskSequenceNumber,
  userId,
} as any);

const mapDispatchToProps = {
  addTaskComment,
  fetchTaskComments,
  removeTaskComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskComments as any);
