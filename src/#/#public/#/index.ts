import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchProjectsPubAct, projectPubIsLoading, projectPubList } from '#/@store/projects-pub';

import { PublicProjects } from './public-projects';

import { IProjectPub, IState } from '@types';

interface IMappedProps {
  isLoading: boolean;
  projectPubList: IProjectPub[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isLoading: projectPubIsLoading,
  projectPubList,
});

const mapDispatch = {
  fetchProjectsPubAct,
};

export default connect(mapState, mapDispatch)(PublicProjects);
