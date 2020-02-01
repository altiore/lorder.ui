import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteProjectRole, fetchProjectRoles, projectRoles } from '#/@store/project';
import { fetchRoles } from '#/@store/roles';
import { ProjectRolesJsx } from './ProjectRoles';

const mapState = createStructuredSelector({
  items: projectRoles,
} as any);

const mapDispatch = {
  getAllItems: fetchProjectRoles,
  fetchRoles,
  deleteItem: deleteProjectRole,
};

export default connect(
  mapState,
  mapDispatch
)(ProjectRolesJsx);
