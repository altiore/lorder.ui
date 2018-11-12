import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteUser, fetchUsers, findUserById, patchUser, userList } from 'src/store/users/index';
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
)(withStyles(styles, { withTheme: true })(UsersJsx) as any);
