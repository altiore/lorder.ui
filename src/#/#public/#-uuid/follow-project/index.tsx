import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { isAuth, userEmail, userId } from '#/@store/identity';
import { postRequestMembership, publicProjectMembers, publicProjectRoles } from '#/@store/publicProject';

import { FollowProjectTsx, IFollowFormProps } from './follow-project';

import { IState } from '@types';

interface IMappedProps {
  roles: any;
  isAuth: boolean;
  userEmail?: string;
  userId: any;
  members: any;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  isAuth,
  members: publicProjectMembers,
  roles: publicProjectRoles,
  userEmail,
  userId,
});

const mapDispatchToProps = {
  onSubmit: postRequestMembership,
  push,
};

const mergeProps = (s, d, o) => ({
  ...s,
  ...d,
  ...o,
  initialValues: { projectId: o.project.id },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(
  reduxForm<IFollowFormProps, any>({
    form: 'BECOME_A_PROJECT_MEMBER_FORM',
  })(FollowProjectTsx)
);
