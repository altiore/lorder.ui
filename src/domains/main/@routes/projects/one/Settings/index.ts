import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { publishProject, updateStatistic } from 'src/store/projects';
import { routeProjectId } from 'src/store/router';
import { SettingsTsx } from './Settings';

const mapState = createStructuredSelector({
  projectId: routeProjectId,
});

const mapDispatch = {
  publishProject,
  updateStatistic,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { publishProject, updateStatistic, ...restDispatch }: any,
  { match, ...restOwn }: any
) => ({
  publishProject: () => publishProject(projectId),
  updateStatistic: () => updateStatistic(projectId),
  ...restState,
  ...restDispatch,
  ...restOwn,
});

export const Settings = connect(
  mapState,
  mapDispatch,
  mergeProps
)(SettingsTsx);
