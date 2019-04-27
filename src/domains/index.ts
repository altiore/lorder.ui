import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { openDialog } from 'store/dialog';
import { userIsLoading, userRole } from 'store/identity';
import { AppTsx } from './App';
import { styles } from './styles';

const mapState = createStructuredSelector({
  userIsLoading,
  userRole,
});

const mapDispatch = {
  openDialog,
};

export const App = withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapState,
      mapDispatch
    )(AppTsx)
  )
);
