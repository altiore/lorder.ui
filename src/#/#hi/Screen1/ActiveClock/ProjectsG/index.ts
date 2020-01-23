import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { activeProjectsCount } from '#/@store/statistics';
import { IState } from '@types';
import ProjectsG, { IProjectsG } from './ProjectsG';

const mapState = createStructuredSelector<IState, IProjectsG>({
  count: activeProjectsCount,
});

export default connect(mapState)(ProjectsG);
