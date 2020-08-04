import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { createRole, deleteManyRoles, deleteRole, fetchRoles, rolesList } from '#/@store/roles';

import { Roles } from './roles';

const mapState = createStructuredSelector({
  rolesList,
} as any);

const dispatchState = {
  createRole,
  deleteManyRoles,
  deleteRole,
  fetchRoles,
};

export default connect(mapState, dispatchState)(Roles);
