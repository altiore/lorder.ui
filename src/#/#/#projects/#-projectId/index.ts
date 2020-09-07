import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { defaultProjectId } from '#/@store/identity';
import { userRole } from '#/@store/identity';
import { fetchOneProject, openedProject } from '#/@store/projects';

import { ProjectTsx } from './one-project';

const mapState = createStructuredSelector({
  defaultProjectId,
  openedProject,
  userRole,
} as any);

const mapDispatch = {
  closeDialog,
  fetchOneProject,
  goTo: push,
  openDialog,
};

export default connect(mapState, mapDispatch)(ProjectTsx);
