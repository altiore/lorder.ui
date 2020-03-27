import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { logOut, userAvatar, userEmail, userRole } from '#/@store/identity';
import { IState } from '@types';
import { AccountMenuTsx } from './account-menu';

const mapStateToProps = createStructuredSelector<IState, any>({
  userAvatar,
  userEmail,
  userRole,
});

const mapDispatchToProps = {
  logOut,
  push,
};

export const AccountMenu = connect<any, any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(AccountMenuTsx);
