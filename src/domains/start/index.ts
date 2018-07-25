import { connect } from 'react-redux';

import { activateUser } from 'src/store/identity'
import { Start as StartJsx } from './Start';

export const Start = connect(
  null,
  {
    activateUser,
  }
)(StartJsx);
