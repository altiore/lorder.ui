import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import { isAuth, userEmail } from '#/@store/identity';
import { postRequestMembership, PublicProjectProjectId, PublicProjectRoles } from '#/@store/publicProject';

import { FollowProjectTsx } from './FollowProject';

import { IState } from '@types';

const mapStateToProps = createStructuredSelector<
  IState,
  {
    roles: any;
    projectId: number | undefined;
    isAuth: boolean;
    userEmail: string | undefined;
  }
>({
  isAuth,
  projectId: PublicProjectProjectId,
  roles: PublicProjectRoles,
  userEmail,
});

const mapDispatchToProps = {
  postRequestMembership,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowProjectTsx));
