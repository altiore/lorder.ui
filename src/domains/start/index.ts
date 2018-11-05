import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { activateUser, userIsLoading } from 'src/store/identity';
import { Start as StartJsx } from './Start';

const mapState = createStructuredSelector({
  userIsLoading,
});

const mapProps = {
  activateUser,
};

export const Start = connect(
  mapState,
  mapProps
)(StartJsx);
