import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { isAuth, logOut, userAvatar, userEmail, userRole } from '#/@store/identity';

import { AccountMenuTsx } from './account-menu';

import { IState } from '@types';

interface IMappedProps {
  isAuth: boolean;
  userAvatar?: string;
  userEmail?: string;
  userRole: string;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  isAuth,
  userAvatar,
  userEmail,
  userRole,
});

const mapDispatchToProps = {
  logOut,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenuTsx);
