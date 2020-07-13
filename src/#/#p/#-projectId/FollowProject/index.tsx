import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import { isAuth, userEmail, userId } from '#/@store/identity';
import {
  postRequestMembership,
  PublicProjectMembers,
  PublicProjectProjectId,
  PublicProjectRoles,
} from '#/@store/publicProject';

import { FollowProjectTsx } from './FollowProject';

import { IState } from '@types';

const mapStateToProps = createStructuredSelector<
  IState,
  {
    roles: any;
    projectId: number | undefined;
    isAuth: boolean;
    userEmail: string | undefined;
    userId: any;
    members: any;
  }
>({
  isAuth,
  members: PublicProjectMembers,
  projectId: PublicProjectProjectId,
  roles: PublicProjectRoles,
  userEmail,
  userId,
});

const mapDispatchToProps = {
  postRequestMembership,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowProjectTsx));
