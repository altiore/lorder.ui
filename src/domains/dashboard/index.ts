import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { isLeftBarOpen, toggleUiSetting } from 'src/store/ui'
import { Dashboard as DashboardJsx } from './Dashboard';
import { styles } from './styles';

export const Dashboard = connect(
  createStructuredSelector({
    isLeftBarOpen,
  }),
  {
    push,
    toggleUiSetting,
  }
)(withStyles(styles, { withTheme: true })(DashboardJsx) as any);
