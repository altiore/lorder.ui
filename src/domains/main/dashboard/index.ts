import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectedProjectId } from 'src/store/project';
import { getProjectById } from 'src/store/projects';
import { getTaskTypeById } from 'src/store/task-types';
import { currentTaskId, isTimerStarted } from 'src/store/timer';
import { allUserWorks, deleteUserWork, getAllUserWorks, startTimer, stopUserWork } from 'src/store/user-works';
import { DashboardJsx } from './Dashboard';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  allUserWorks,
  currentTaskId,
  getProjectById,
  getTaskTypeById,
  isTimerStarted,
  selectedProjectId,
});

const mapDispatchToProps = {
  deleteUserWork,
  getAllUserWorks,
  startTimer,
  stopUserWork,
};

const mergeProps = (state: any, { deleteUserWork, stopUserWork, ...props }: any, ownProps: any) => ({
  ...state,
  ...props,
  deleteUserWork: (taskId: number) => deleteUserWork({ projectId: state.selectedProjectId, taskId }),
  stopUserWork: (taskId: number) => stopUserWork({ projectId: state.selectedProjectId, taskId }),
  ...ownProps,
});

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles, { withTheme: true })(DashboardJsx));
