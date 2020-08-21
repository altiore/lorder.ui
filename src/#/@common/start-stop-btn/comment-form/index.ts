import { connect } from 'react-redux';

import { bringBack } from '#/@store/user-works';

import { CommentForm } from './comment-form';

const mapDispatch = {
  bringBack,
};

export default connect(undefined, mapDispatch)(CommentForm);
