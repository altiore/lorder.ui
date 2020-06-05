import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isAuth } from '#/@store/identity';
import {
  fetchPublicProject,
  publicProjectIsLoaded,
  publicProjectIsLoading,
  publicProjectProject,
  publicProjectUuid,
} from '#/@store/publicProject';
import { rolesList } from '#/@store/roles';

import { PublicProjectTsx } from './PublicProject';

import { IState } from '@types';

const masStateToProps = createStructuredSelector<IState, any>({
  isAuth,
  isLoaded: publicProjectIsLoaded,
  isLoading: publicProjectIsLoading,
  project: publicProjectProject,
  publicProjectUuid,
  rolesList,
});

const mapDispatch = {
  fetchPublicProject,
};

export default connect(masStateToProps, mapDispatch)(PublicProjectTsx);
