import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ProjectButton from '#/@common/project-button';
import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { defaultProjectInfo, selectedProject } from '#/@store/projects';
import { inProgress as inProgressUserWork } from '#/@store/user-works';

import { IProject, IState } from '@types';

const project = createDeepEqualSelector(
  [defaultProjectInfo, selectedProject],
  (defP, selected: IProject) => selected || defP
);

const inProgress = createDeepEqualSelector([inProgressUserWork, selectedProject], (isInProgress, selected: IProject) =>
  selected ? isInProgress : false
);

interface IMappedProps {
  inProgress: boolean;
  project?: IProject;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  inProgress,
  project,
});

export default connect(mapStateToProps)(ProjectButton);
