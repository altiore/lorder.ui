import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { activateUser, userIsLoading } from '#/@store/identity';

import { Start as StartJsx } from './Start';

const mapState = createStructuredSelector({
  userIsLoading,
} as any);

const mapProps = {
  activateUser,
};

export default connect(
  mapState,
  mapProps
)(StartJsx as any);
