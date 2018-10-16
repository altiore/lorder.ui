import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { findUserById, userList } from 'src/store/users';
import { DashboardJsx } from './Dashboard';
import { styles } from './styles';

export const Dashboard = connect(
  createStructuredSelector({
    findUserById,
    userList,
  })
)(withStyles(styles, { withTheme: true })(DashboardJsx) as any);
