import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteUserWork, getUserWorksById, startTimer, stopUserWork } from '@store/tasks';
import { currentUserWorkId } from '@store/timer';
import { UserWorkTableJsx } from './UserWorkTable';

const mapStateToProps = createStructuredSelector({
  currentUserWorkId,
  getUserWorksById,
} as any);

const mapDispatchToProps = {
  deleteUserWork,
  startTimer,
  stopUserWork,
};

const mergeProps = (
  { getUserWorksById, ...restState }: any,
  { deleteUserWork, stopUserWork, ...props }: any,
  { taskId, projectId, ...ownProps }: any
) => ({
  ...restState,
  ...props,
  deleteUserWork: (userWorkId: number) => deleteUserWork({ projectId, taskId, userWorkId }),
  projectId,
  stopUserWork: (userWorkId: number) => stopUserWork({ projectId, taskId, userWorkId }),
  taskId,
  userWorks: getUserWorksById(taskId),
  ...ownProps,
});

export const UserWorkTable = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserWorkTableJsx);
