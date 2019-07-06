import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { infoProjects } from '@store/info';
import { IState } from '@types';
import ProjectsG, { IProjectsG } from './ProjectsG';

const mapState = createStructuredSelector<IState, IProjectsG>({
  count: infoProjects,
});

export default connect(mapState)(ProjectsG);
