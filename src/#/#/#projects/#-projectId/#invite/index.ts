import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { openedProject } from '#/@store/projects';
import { acceptInvitation } from '#/@store/projects/members';

import { ProjectInviteJsx } from './project.invite';

const mapState = createStructuredSelector({
  openedProject,
} as any);

const mapDispatch = {
  acceptInvitation,
};

export default connect(mapState, mapDispatch)(ProjectInviteJsx);
