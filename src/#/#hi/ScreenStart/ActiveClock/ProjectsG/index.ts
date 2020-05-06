import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { activeProjectsCount } from '#/@store/statistics';

import ProjectsG, { IProjectsG } from './ProjectsG';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, IProjectsG>({
  count: activeProjectsCount,
});

export default connect(mapState)(ProjectsG);
