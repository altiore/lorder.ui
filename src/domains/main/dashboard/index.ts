import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectedProjectId } from 'src/store/project';
import { currentTaskId } from 'src/store/timer';
import { allUserTasks, deleteUserTask, getAllUserTasks, stopUserTask } from 'src/store/user-tasks';
import { DashboardJsx } from './Dashboard';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  allUserTasks,
  currentTaskId,
  selectedProjectId,
});

const mapDispatchToProps = {
  deleteUserTask,
  getAllUserTasks,
  stopUserTask,
};

const mergeProps = (state: any, props: any, ownProps: any) => ({
  ...state,
  ...props,
  deleteUserTask: (taskId: number) => props.deleteUserTask({ projectId: state.selectedProjectId, taskId }),
  stopUserTask: (taskId: number) => props.stopUserTask({ projectId: state.selectedProjectId, taskId }),
  ...ownProps,
});

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles, { withTheme: true })(DashboardJsx) as any);
