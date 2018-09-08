import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteUser, fetchUsers, userList } from 'src/store/users';
import { styles } from './styles';
import { Users as UsersJsx } from './Users';

export const Users = connect(
  createStructuredSelector({
    userList,
  }),
  {
    deleteUser,
    fetchUsers,
  }
)(withStyles(styles, { withTheme: true })(UsersJsx) as any);
