import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getProjectById } from 'src/store/projects';
import { allTasks, getAllTasks, startTimer, startUserWork, stopUserWork } from 'src/store/tasks';
import { currentTaskId, isTimerStarted } from 'src/store/timer';
import { DashboardJsx } from './Dashboard';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  allTasks,
  currentTaskId,
  getProjectById,
  isTimerStarted,
});

const mapDispatchToProps = {
  getAllTasks,
  startTimer,
  startUserWork,
  stopUserWork,
};

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(DashboardJsx));
