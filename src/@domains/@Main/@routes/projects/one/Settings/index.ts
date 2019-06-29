import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { publishProject, updateStatistic } from '@store/projects';
import { routeProjectId } from '@store/router';
import { SettingsTsx } from './Settings';

const mapState = createStructuredSelector({
  projectId: routeProjectId,
} as any);

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

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(SettingsTsx);
