import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userAvatar, userDisplayName, userEmail } from '#/@store/identity';
import { projectsExceptDefault } from '#/@store/projects';

import { Profile } from './Profile';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, any>({
  projects: projectsExceptDefault,
  userAvatar,
  userDisplayName,
  userEmail,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Profile);
