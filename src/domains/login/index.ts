import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { userRole } from 'src/store/user'

import { Login as LoginJsx } from './Login';
import * as s from './style.m.scss';

export const Login = connect(
  createStructuredSelector({
    userRole,
  })
)(CSSModules(LoginJsx, s));
