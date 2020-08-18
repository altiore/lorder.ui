import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userId } from '#/@store/identity';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router';
import { addTaskComment, fetchTaskComments, removeTaskComment } from '#/@store/task-comments';
import { getTaskBySequenceNumber } from '#/@store/tasks';

import { TaskComments } from './task-comments';

import { IState } from '@types';

interface IMappedProps {
  getTaskBySequenceNumber: any;
  projectId?: number;
  sequenceNumber?: number;
  userId?: number;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  getTaskBySequenceNumber,
  projectId: routeProjectId,
  sequenceNumber: routeTaskSequenceNumber,
  userId,
});

const mapDispatchToProps = {
  addTaskComment,
  fetchTaskComments,
  removeTaskComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskComments as any);
