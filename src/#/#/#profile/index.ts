import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';
import { userAvatar, userEmail, userRole } from '#/@store/identity';
import { Profile } from './Profile';

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
