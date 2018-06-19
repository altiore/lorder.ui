import { connect } from 'react-redux';

import { activateUser } from 'src/store/user'
import { Start as StartJsx } from './Start';

export const Start = connect(
  null,
  {
    activateUser,
  }
)(StartJsx);
