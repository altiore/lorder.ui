import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from '@hooks/withResize';
import { deleteUser, fetchUsers, findUserById, patchUser, userList } from '#/#/@store/users';
import { UsersJsx } from './Users';

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
