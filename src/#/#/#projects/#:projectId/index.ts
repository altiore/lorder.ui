import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { userRole } from '#/@store/identity';
import { fetchProjectDetails, openedProject } from '#/@store/projects';

import { ProjectTsx } from './one-project';

const mapState = createStructuredSelector({
  openedProject,
  userRole,
} as any);

const mapDispatch = {
  closeDialog,
  fetchProjectDetails,
  goTo: push,
  openDialog,
};

export default connect(
  mapState,
  mapDispatch
)(ProjectTsx);
