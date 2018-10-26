import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteUserWork, startTimer, stopUserWork } from 'src/store/tasks';
import { currentTaskId } from 'src/store/timer';
import { styles } from './styles';
import { UserWorkTableJsx } from './UserWorkTable';

const mapStateToProps = createStructuredSelector({
  currentTaskId,
});

const mapDispatchToProps = {
  deleteUserWork,
  startTimer,
  stopUserWork,
};

const mergeProps = (state: any, { deleteUserWork, stopUserWork, ...props }: any, { taskId, ...ownProps }: any) => ({
  ...state,
  ...props,
  deleteUserWork: (userWorkId: number) => deleteUserWork({ projectId: state.selectedProjectId, taskId, userWorkId }),
  stopUserWork: (userWorkId: number) => stopUserWork({ projectId: state.selectedProjectId, taskId, userWorkId }),
  ...ownProps,
});

export const UserWorkTable = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles, { withTheme: true })(UserWorkTableJsx));
