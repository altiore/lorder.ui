import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { fetchProjectsPubAct, projectPubList } from '#/@store/projects-pub';

import { ProjectsList } from './projects-list';

import { IProjectPub, IState } from '@types';

interface IMappedProps {
  projectPubList: IProjectPub[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  projectPubList,
});

const mapDispatch = {
  fetchProjectsPubAct,
};

export default connect(mapState, mapDispatch)(ProjectsList);
