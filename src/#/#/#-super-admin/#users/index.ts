import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { deleteUser, fetchUsers, findUserById, patchUser, userList } from '#/#/@store/users';

import { UsersJsx } from './users';

import { withResize } from '@hooks/with-resize';

export default connect(
  createStructuredSelector({
    findUserById,
    userList,
  } as any),
  {
    deleteUser,
    fetchUsers,
    patchUser,
  }
)(withResize(UsersJsx));
