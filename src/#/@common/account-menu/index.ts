import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { isAuth, logOut, userAvatar, userEmail, userRole } from '#/@store/identity';

import { AccountMenuTsx } from './account-menu';

import { IState } from '@types';

const mapStateToProps = createStructuredSelector<IState, any>({
  isAuth,
  userAvatar,
  userEmail,
  userRole,
});

const mapDispatchToProps = {
  logOut,
  push,
};

export const AccountMenu = connect<any, any, any, any>(mapStateToProps, mapDispatchToProps)(AccountMenuTsx);
