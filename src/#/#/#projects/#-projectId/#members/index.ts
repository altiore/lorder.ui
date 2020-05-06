import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userId } from '#/@store/identity';
import { fetchProjectMembers, projectRoles } from '#/@store/project';
import { openedAccessLevel, projectMembers } from '#/@store/projects';
import { addProjectMember, deleteProjectMember, updateMemberLevel } from '#/@store/projects/members';
import { routeProjectId } from '#/@store/router';

import { ProjectMembersJsx } from './project.members';

const mapStateToProps = createStructuredSelector({
  list: projectMembers,
  openedAccessLevel,
  projectId: routeProjectId,
  projectRoles,
  userId,
} as any);

const mapDispatchToProps = {
  createItem: addProjectMember,
  deleteItem: deleteProjectMember,
  fetchItems: fetchProjectMembers,
  updateMemberLevel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMembersJsx);
