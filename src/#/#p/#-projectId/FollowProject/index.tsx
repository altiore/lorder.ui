import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { rolesList } from '#/@store/roles';

import { FollowProjectTsx } from './FollowProject';

import { IState, IUserRole } from '@types';

const masStateToProps = createStructuredSelector<IState, { roles: IUserRole[] }>({
  roles: rolesList,
});

export default connect(masStateToProps)(FollowProjectTsx);
