import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { isMagicLoginForm, toggleUiSetting } from 'src/store/ui'
import { userRole } from 'src/store/user'

import { Login as LoginJsx } from './Login';
import * as s from './style.m.scss';

export const Login = connect(
  createStructuredSelector({
    isMagicLoginForm,
    userRole,
  }),
  {
    toggleUiSetting,
  }
)(CSSModules(LoginJsx, s) as React.ComponentType<RouteComponentProps<{}>>);
