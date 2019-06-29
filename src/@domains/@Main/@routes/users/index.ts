import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from '@hooks/withResize';
import { deleteUser, fetchUsers, findUserById, patchUser, userList } from '@store/users';
import { styles } from './styles';
import { Users as UsersJsx } from './Users';

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
)(withResize(withStyles(styles, { withTheme: true })(UsersJsx)));
