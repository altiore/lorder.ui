import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { projectMembers } from '#/@store/projects';
import { deleteProjectMember } from '#/@store/projects/members';
import { routeProjectId } from '#/@store/router';

import { ProjectMembersJsx } from './ProjectMembers';

const mapStateToProps = createStructuredSelector({
  list: projectMembers,
  projectId: routeProjectId,
} as any);

const mapDispatchToProps = {
  deleteItem: deleteProjectMember,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMembersJsx);
