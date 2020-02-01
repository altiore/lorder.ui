import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createRole, deleteManyRoles, deleteRole, fetchRoles, rolesList } from '#/@store/roles';
import { Roles } from './Roles';

const mapState = createStructuredSelector({
  rolesList,
} as any);

const dispatchState = {
  createRole,
  deleteRole,
  deleteManyRoles,
  fetchRoles,
};

export default connect(
  mapState,
  dispatchState
)(Roles);
