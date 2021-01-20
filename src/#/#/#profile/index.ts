import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { openDialog } from '#/@store/dialog';
import { userAvatar, userDisplayName, userEmail, userSocials } from '#/@store/identity';
import { projectsExceptDefault } from '#/@store/projects';

import { Profile } from './profile';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, any>({
  projects: projectsExceptDefault,
  userAvatar,
  userDisplayName,
  userEmail,
  userSocials,
});

const mapDispatch = {
  openDialog,
};

export default connect(mapState, mapDispatch)(Profile);
