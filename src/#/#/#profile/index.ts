import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userAvatar, userEmail, userRole } from '#/@store/identity';

import { Profile } from './Profile';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, any>({
  userAvatar,
  userEmail,
  userRole,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch
)(Profile);
