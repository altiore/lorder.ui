import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteTaskTypeFromProject, getAllProjectTaskTypes, projectTaskTypes } from '@store/projects';
import { routeProjectId } from '@store/router';
import { getAllTaskTypes, getTaskTypeById } from '@store/task-types';
import { ProjectTaskTypesJsx } from './ProjectTaskTypes';
import { styles } from './styles';

const mapState = createStructuredSelector({
  getTaskTypeById,
  projectId: routeProjectId,
  projectTaskTypes,
} as any);

const mapDispatch = {
  deleteTaskTypeFromProject,
  getAllProjectTaskTypes,
  getAllTaskTypes,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { deleteTaskTypeFromProject, getAllProjectTaskTypes, ...restDispatch }: any,
  { match, ...restOwn }: any
) => ({
  deleteTaskType: (taskTypeId: number) => deleteTaskTypeFromProject({ projectId, taskTypeId }),
  getAllProjectTaskTypes: () => getAllProjectTaskTypes(projectId),
  ...restState,
  ...restDispatch,
  ...restOwn,
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(ProjectTaskTypesJsx));
