import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';

export const LoadingPage = () => (
  <div styleName="loading">
    <CircularProgress size={100} color="secondary" />
  </div>
);
