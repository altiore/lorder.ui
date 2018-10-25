import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectedProjectId } from 'src/store/project';
import { getProjectById } from 'src/store/projects';
import { getTaskTypeById } from 'src/store/task-types';
import { currentTaskId, isTimerStarted } from 'src/store/timer';
import { deleteUserWork, startTimer, stopUserWork } from 'src/store/user-works';
import { styles } from './styles';
import { UserWorkTableJsx } from './UserWorkTable';

const mapStateToProps = createStructuredSelector({
  currentTaskId,
  getProjectById,
  getTaskTypeById,
  isTimerStarted,
  selectedProjectId,
});

const mapDispatchToProps = {
  deleteUserWork,
  startTimer,
  stopUserWork,
};

const mergeProps = (state: any, { deleteUserWork, stopUserWork, ...props }: any, ownProps: any) => ({
  ...state,
  ...props,
  deleteUserWork: (userWorkId: number) => deleteUserWork({ projectId: state.selectedProjectId, userWorkId }),
  stopUserWork: (userWorkId: number) => stopUserWork({ projectId: state.selectedProjectId, userWorkId }),
  ...ownProps,
});

export const UserWorkTable = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles, { withTheme: true })(UserWorkTableJsx));
