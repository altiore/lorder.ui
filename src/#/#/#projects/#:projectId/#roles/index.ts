import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteProjectRole, fetchProjectRoles, projectRoles } from '#/@store/project';
import { fetchRoles, rolesList } from '#/@store/roles';
import { ProjectRolesJsx } from './ProjectRoles';

const mapState = createStructuredSelector({
  rolesList,
  projectRoles,
} as any);

const mapDispatch = {
  fetchProjectRoles,
  fetchRoles,
  deleteProjectRole,
};

export default connect(
  mapState,
  mapDispatch
)(ProjectRolesJsx);
