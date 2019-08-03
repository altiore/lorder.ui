import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { publishProject, updateStatistic } from '@store/projects';
import { routeProjectId } from '@store/router';
import { SettingsTsx } from './Settings';
import { IState } from '@types';

const mapState = createStructuredSelector<IState, { projectId?: number }>({
  projectId: routeProjectId,
});

const mapDispatch = {
  publishProject,
  updateStatistic,
};

export default connect(
  mapState,
  mapDispatch
)(SettingsTsx);
