import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import Comment from '@components/comment';

import { getProjectMemberById } from '#/@store/projects';

import { IUser } from '@types';

const mapState = createStructuredSelector({
  getProjectMemberById,
});

const mapDispatch = {};

const mergeProps = ({ getProjectMemberById: getMember }, restProps, { createdBy, ...restOwnProps }) => {
  const user = getMember(createdBy);
  return {
    user,
    ...restProps,
    ...restOwnProps,
  };
};

export default connect<any, any, any, { user: IUser }>(mapState, mapDispatch, mergeProps)(Comment);
