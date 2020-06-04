import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ProjectButton from '#/@common/ProjectButton';
import { selectedProject } from '#/@store/projects';
import { inProgress } from '#/@store/user-works';

import { IProject, IState } from '@types';

const mapStateToProps = createStructuredSelector<IState, { project: IProject; inProgress: boolean }>({
  inProgress,
  project: selectedProject,
});

export default connect(mapStateToProps)(ProjectButton);
