import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { createProjectRole, deleteProjectRole, fetchProjectRoles, projectRoles } from '#/@store/project';
import { fetchRoles, rolesList } from '#/@store/roles';

import { ProjectRolesJsx } from './project.roles';

const mapState = createStructuredSelector({
  projectRoles,
  rolesList,
} as any);

const mapDispatch = {
  createProjectRole,
  deleteProjectRole,
  fetchProjectRoles,
  fetchRoles,
};

export default connect(mapState, mapDispatch)(ProjectRolesJsx);
