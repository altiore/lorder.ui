import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { projectMembers } from '#/@store/projects';
import { deleteProjectMember } from '#/@store/projects/members';
import { routeProjectId } from '#/@store/router';

import { ProjectMembersJsx } from './ProjectMembers';

const mapStateToProps = createStructuredSelector({
  projectId: routeProjectId,
  projectMembers,
} as any);

const mapDispatchToProps = {
  closeDialog,
  deleteProjectMember,
  goToPage: push,
  openDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMembersJsx);
