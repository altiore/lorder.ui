import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userId } from '#/@store/identity';
import { fetchProjectMembers, fetchProjectRoles, projectRoles } from '#/@store/project';
import { openedAccessLevel, projectMembers } from '#/@store/projects';
import { addProjectMember, deleteProjectMember, updateMemberLevel } from '#/@store/projects/members';
import { routeProjectId } from '#/@store/router';

import { ProjectMembersJsx } from './project.members';

import { ACCESS_LEVEL, IProjectRole, IState } from '@types';

interface IMappedProps {
  list: any[];
  openedAccessLevel?: ACCESS_LEVEL;
  projectId?: number;
  projectRoles: IProjectRole[];
  userId?: number;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  list: projectMembers,
  openedAccessLevel,
  projectId: routeProjectId,
  projectRoles,
  userId,
});

const mapDispatchToProps = {
  createItem: addProjectMember,
  deleteItem: deleteProjectMember,
  fetchItems: fetchProjectMembers,
  fetchProjectRoles,
  updateMemberLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMembersJsx);
