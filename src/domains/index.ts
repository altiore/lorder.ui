import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { userIsLoading, userRole } from 'src/store/identity';
import { AppTsx } from './App';

export const App = withRouter(
  connect(
    createStructuredSelector({
      userIsLoading,
      userRole,
    })
  )(AppTsx)
);
