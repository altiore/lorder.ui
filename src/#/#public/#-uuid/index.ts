import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isAuth, userId } from '#/@store/identity';
import { getProjectByUuid } from '#/@store/projects';
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

import { IProject, IState } from '@types';

interface IMappedProps {
  getProjectByUuid: (uuid: string) => IProject | undefined;
  isAuth: boolean;
  isLoaded?: boolean;
  isLoading?: boolean;
  publicProject?: IProject;
  publicProjectUuid?: string;
  rolesList: any;
  statistic: any;
  userId: any;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  getProjectByUuid,
  isAuth,
  isLoaded: publicProjectIsLoaded,
  isLoading: publicProjectIsLoading,
  publicProject: publicProjectProject,
  publicProjectUuid,
  rolesList,
  statistic: publicProjectStatistic,
  userId,
});

const mapDispatch = {
  fetchPublicProject,
};

export default connect(mapStateToProps, mapDispatch)(PublicProjectTsx);
