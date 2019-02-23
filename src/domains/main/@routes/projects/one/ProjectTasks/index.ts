import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { isFormMount } from 'src/store/form';
import { deleteProjectTask, getAllProjectTasks, PROJECT_EDIT_TASK_FORM_NAME, projectTasks } from 'src/store/projects';
import { routeProjectId } from 'src/store/router';
import { ProjectTasksJsx } from './ProjectTasks';
import { styles } from './styles';

const mapState = createStructuredSelector({
  isFormMount: isFormMount(PROJECT_EDIT_TASK_FORM_NAME),
  projectId: routeProjectId,
  projectTasks,
});

const mapDispatch = {
  closeDialog,
  deleteProjectTask,
  destroy,
  getAllProjectTasks,
  openDialog,
  push,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { deleteProjectTask, destroy, getAllProjectTasks, ...restDispatch }: any,
  { match, ...restOwn }: any
) => ({
  ...restState,
  ...restDispatch,
  deleteProjectTask: (taskId: number) => deleteProjectTask({ taskId, projectId }),
  destroyEditTaskForm: () => destroy(PROJECT_EDIT_TASK_FORM_NAME),
  getAllProjectTasks: () => getAllProjectTasks(projectId),
  projectId,
  ...restOwn,
});

export const ProjectTasks = connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(ProjectTasksJsx));
