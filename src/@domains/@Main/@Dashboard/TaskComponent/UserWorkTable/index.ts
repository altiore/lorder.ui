import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteUserWork, startTimer, stopUserWork } from '@store/tasks';
import { currentUserWorkId } from '@store/timer';
import { UserWorkTableJsx } from './UserWorkTable';

const mapStateToProps = createStructuredSelector({
  currentUserWorkId,
} as any);

const mapDispatchToProps = {
  deleteUserWork,
  startTimer,
  stopUserWork,
};

const mergeProps = (
  state: any,
  { deleteUserWork, stopUserWork, ...props }: any,
  { taskId, projectId, ...ownProps }: any
) => ({
  ...state,
  ...props,
  deleteUserWork: (userWorkId: number) => deleteUserWork({ projectId, taskId, userWorkId }),
  projectId,
  stopUserWork: (userWorkId: number) => stopUserWork({ projectId, taskId, userWorkId }),
  taskId,
  ...ownProps,
});

export const UserWorkTable = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserWorkTableJsx);
