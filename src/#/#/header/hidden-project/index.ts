import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ProjectButton from '#/@common/project-button';
import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { defaultProjectInfo } from '#/@store/projects';
import { currentProjectId } from '#/@store/timer';
import { isPaused } from '#/@store/user-works';

import { IProject, IState } from '@types';

const project = createDeepEqualSelector([currentProjectId, defaultProjectInfo], (curId, defProject) => {
  return curId ? (curId === defProject?.id ? undefined : defProject) : undefined;
});

interface IMappedProps {
  inProgress: boolean;
  project?: IProject;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  inProgress: isPaused,
  project,
});

export default connect(mapStateToProps)(ProjectButton);
