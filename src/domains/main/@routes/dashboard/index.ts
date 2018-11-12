import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getProjectById } from 'src/store/projects';
import { filteredByProjectTasks, getAllTasks } from 'src/store/tasks';
import { currentUserWorkId } from 'src/store/timer';
import { DashboardJsx } from './Dashboard';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  currentUserWorkId,
  filteredTasks: filteredByProjectTasks,
  getProjectById,
});

const mapDispatchToProps = {
  getAllTasks,
};

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(DashboardJsx));
