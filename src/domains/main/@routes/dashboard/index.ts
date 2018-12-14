import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getProjectById } from 'src/store/projects';
import { getAllTasks, sortedByFilterTasks } from 'src/store/tasks';
import { currentUserWorkId } from 'src/store/timer';
import { DashboardJsx } from './Dashboard';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  currentUserWorkId,
  getProjectById,
  tasks: sortedByFilterTasks,
});

const mapDispatchToProps = {
  getAllTasks,
};

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(DashboardJsx));
