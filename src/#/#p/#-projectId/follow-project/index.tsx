import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import { isAuth, userEmail, userId } from '#/@store/identity';
import {
  postRequestMembership,
  publicProjectMembers,
  publicProjectProjectId,
  publicProjectRoles,
} from '#/@store/publicProject';

import { FollowProjectTsx } from './follow-project';

import { IState } from '@types';

interface IMappedProps {
  roles: any;
  projectId: number | undefined;
  isAuth: boolean;
  userEmail: string | undefined;
  userId: any;
  members: any;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  isAuth,
  members: publicProjectMembers,
  projectId: publicProjectProjectId,
  roles: publicProjectRoles,
  userEmail,
  userId,
});

const mapDispatchToProps = {
  postRequestMembership,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowProjectTsx));
