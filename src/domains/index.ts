import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { userRole } from 'src/store/user'
import { App as AppRaw } from './App';

export const App = connect(
  createStructuredSelector({
    userRole,
  })
)(AppRaw);
