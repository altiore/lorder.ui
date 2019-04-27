import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from 'hocs/withResize';
import { deleteUser, fetchUsers, findUserById, patchUser, userList } from 'store/users';
import { styles } from './styles';
import { Users as UsersJsx } from './Users';

export const Users = connect(
  createStructuredSelector({
    findUserById,
    userList,
  }),
  {
    deleteUser,
    fetchUsers,
    patchUser,
  }
)(withResize(withStyles(styles, { withTheme: true })(UsersJsx)));
