import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { deleteProjectRole, fetchProjectRoles, projectRoles } from '#/@store/project';
import { fetchRoles, rolesList } from '#/@store/roles';

import { ProjectRolesJsx } from './ProjectRoles';

const mapState = createStructuredSelector({
  projectRoles,
  rolesList,
} as any);

const mapDispatch = {
  deleteProjectRole,
  fetchProjectRoles,
  fetchRoles,
};

export default connect(
  mapState,
  mapDispatch
)(ProjectRolesJsx);
