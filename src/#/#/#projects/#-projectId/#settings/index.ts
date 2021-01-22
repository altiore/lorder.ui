import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isLoading, openedProject, Project, publishProject, updateStatistic } from '#/@store/projects';
import { routeProjectId } from '#/@store/router';

import { SettingsTsx } from './settings';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, { openedProject?: Project; projectId?: number; isLoading: boolean }>({
  isLoading,
  openedProject,
  projectId: routeProjectId,
});

const mapDispatch = {
  publishProject,
  updateStatistic,
};

export default connect(mapState, mapDispatch)(SettingsTsx);
