import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createRole, deleteRole, fetchRoles, rolesList } from '#/@store/roles';
import { Roles } from './Roles';

const mapState = createStructuredSelector({
  rolesList,
} as any);

const dispatchState = {
  createRole,
  deleteRole,
  fetchRoles,
};

export default connect(
  mapState,
  dispatchState
)(Roles);
