import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { showSuccess } from '#/@store/notifications';
import { ownProjectListWithoutDefault } from '#/@store/projects';
import { openTaskModal } from '#/@store/tasks';
import { currentProjectId } from '#/@store/timer';
import { startUserWork } from '#/@store/user-works';

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
  openTaskModal,
  push,
  showSuccess,
  startUserWork,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelect);
