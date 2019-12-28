import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getProjectMemberById } from '@store/projects';
import { IUser } from '@types';

import Comment from '@components/Comment';

const mapState = createStructuredSelector({
  getProjectMemberById,
});

const mapDispatch = {};

const mergeProps = ({ getProjectMemberById }, restProps, { createdBy, ...restOwnProps }) => {
  const user = getProjectMemberById(createdBy);
  return {
    user,
    ...restProps,
    ...restOwnProps,
  };
};

export default connect<any, any, any, { user: IUser }>(
  mapState,
  mapDispatch,
  mergeProps
)(Comment);
