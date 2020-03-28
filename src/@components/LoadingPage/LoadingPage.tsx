import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './styles';

export const LoadingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <CircularProgress size={100} color="secondary" />
    </div>
  );
};
