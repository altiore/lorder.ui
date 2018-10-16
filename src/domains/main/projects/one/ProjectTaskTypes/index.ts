import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteTaskTypeFromProject, projectTaskTypes } from 'src/store/projects';
import { projectId } from 'src/store/router';
import { getAllTaskTypes, getTaskTypeById } from 'src/store/task-types';
import { ProjectTaskTypesJsx } from './ProjectTaskTypes';
import { styles } from './styles';

const mapState = createStructuredSelector({
  getTaskTypeById,
  projectId,
  projectTaskTypes,
});

const mapDispatch = {
  deleteTaskTypeFromProject,
  getAllTaskTypes,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { deleteTaskTypeFromProject, ...restDispatch }: any,
  { match, ...restOwn }: any
) => ({
  deleteTaskType: (taskTypeId: number) => deleteTaskTypeFromProject({ projectId, taskTypeId }),
  ...restState,
  ...restDispatch,
  ...restOwn,
});

export const ProjectTaskTypes = connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(ProjectTaskTypesJsx));
