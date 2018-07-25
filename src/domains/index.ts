import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { userRole } from 'src/store/identity';
import { App as AppRaw } from './App';

export const App = withRouter(connect(
  createStructuredSelector({
    userRole,
  }),
)(AppRaw as React.ComponentType<RouteComponentProps<{}>>));
