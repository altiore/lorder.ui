import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { logOut, userAvatar, userEmail, userRole } from '#/@store/identity';

import { RightMenuTsx } from './RightMenu';

import { IState } from '@types';

const mapStateToProps = createStructuredSelector<IState, any>({
  userAvatar,
  userEmail,
  userRole,
});

const mapDispatchToProps = {
  logOut,
  push,
};

export const RightMenu = connect<any, any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(RightMenuTsx);
