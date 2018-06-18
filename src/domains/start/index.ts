import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAuthActivate, userRole } from 'src/store/user'

import { Start as StartJsx } from './Start';
import * as s from './style.m.scss';

export const Start = connect(
  createStructuredSelector({
    userRole,
  }),
  {
    getAuthActivate,
  }
)(CSSModules(StartJsx, s));
