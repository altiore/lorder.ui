import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { ownProjectListWithoutDefault } from '#/@store/projects';
import { currentProjectId } from '#/@store/timer';
import { startUserWork, tryToCreateAndStart } from '#/@store/user-works';

import { ProjectSelect } from './project-select';

import { IProject, IState } from '@types';

interface IMappedProjectSelectState {
  projectId?: number;
  projects: IProject[];
}

const mapStateToProps = createStructuredSelector<IState, IMappedProjectSelectState>({
  projectId: currentProjectId,
  projects: ownProjectListWithoutDefault,
});

const mapDispatchToProps = {
  push,
  startUserWork,
  tryToCreateAndStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelect);
