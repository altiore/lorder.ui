import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { getAllTasks } from 'src/store/tasks';
import { DashboardJsx } from './Dashboard';
import { styles } from './styles';

const mapDispatchToProps = {
  getAllTasks,
};

export const Dashboard = connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(DashboardJsx));
