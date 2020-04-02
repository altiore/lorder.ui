import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userId } from '#/@store/identity';
import { openedAccessLevel, projectMembers } from '#/@store/projects';
import { addProjectMember, deleteProjectMember, updateMemberLevel } from '#/@store/projects/members';
import { fetchRoles, rolesList } from '#/@store/roles';

import { ProjectMembersJsx } from './project.members';

const mapStateToProps = createStructuredSelector({
  list: projectMembers,
  openedAccessLevel,
  rolesList,
  userId,
} as any);

const mapDispatchToProps = {
  createItem: addProjectMember,
  deleteItem: deleteProjectMember,
  fetchRoles,
  updateMemberLevel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMembersJsx);
