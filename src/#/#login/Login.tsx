import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AuthForm from '#/@common/AuthForm';

import { useStyles } from './styles';

export const Login: React.FC<RouteComponentProps<{}>> = () => {
  const classes = useStyles();

  console.log('render Login Page');
  return (
    <div className={classes.login}>
      <AuthForm autoFocus />
    </div>
  );
};
