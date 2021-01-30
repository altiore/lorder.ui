import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchProjectsStatisticAct, projectPubIsLoading, projectPubList } from '#/@store/projects-statistic';

import { PublicProjects } from './public-projects';

import { IProjectStatistic, IState } from '@types';

interface IMappedProps {
  isLoading: boolean;
  projectPubList: IProjectStatistic[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isLoading: projectPubIsLoading,
  projectPubList,
});

const mapDispatch = {
  fetchProjectsStatisticAct,
};

export default connect(mapState, mapDispatch)(PublicProjects);
