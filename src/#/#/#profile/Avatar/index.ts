import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { uploadAvatar } from '#/@store/identity';

import { Avatar } from './Avatar';

const mapState = createStructuredSelector({});

const mapDispatch = {
  uploadAvatar,
};

export default connect(
  mapState,
  mapDispatch
)(Avatar);
