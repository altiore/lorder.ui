import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import ProjectButton from '#/@common/ProjectButton';
import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { defaultProjectInfo } from '#/@store/projects';
import { currentProjectId } from '#/@store/timer';
import { isPaused } from '#/@store/user-works';

import { IProject, IState } from '@types';

const project = createDeepEqualSelector([currentProjectId, defaultProjectInfo], (curId, defProject) =>
  curId === defProject?.id ? undefined : defProject
);

const mapStateToProps = createStructuredSelector<IState, { project?: IProject; inProgress: boolean }>({
  inProgress: isPaused,
  project,
});

export default connect(mapStateToProps)(ProjectButton);
