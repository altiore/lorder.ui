import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteTaskTypeFromProject, getAllProjectTaskTypes, projectTaskTypes } from 'src/store/projects/index';
import { projectId } from 'src/store/router/index';
import { getAllTaskTypes, getTaskTypeById } from 'src/store/task-types/index';
import { ProjectTaskTypesJsx } from './ProjectTaskTypes';
import { styles } from './styles';

const mapState = createStructuredSelector({
  getTaskTypeById,
  projectId,
  projectTaskTypes,
});

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

export const ProjectTaskTypes = connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(ProjectTaskTypesJsx));
