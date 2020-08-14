import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isAuth, userId } from '#/@store/identity';
import {
  fetchPublicProject,
  publicProjectIsLoaded,
  publicProjectIsLoading,
  publicProjectProject,
  publicProjectStatistic,
  publicProjectUuid,
} from '#/@store/publicProject';
import { rolesList } from '#/@store/roles';

import { PublicProjectTsx } from './public-project';

import { IState } from '@types';

const mapStateToProps = createStructuredSelector<IState, any>({
  isAuth,
  isLoaded: publicProjectIsLoaded,
  isLoading: publicProjectIsLoading,
  project: publicProjectProject,
  publicProjectUuid,
  rolesList,
  statistic: publicProjectStatistic,
  userId,
});

const mapDispatch = {
  fetchPublicProject,
};

export default connect(mapStateToProps, mapDispatch)(PublicProjectTsx);
