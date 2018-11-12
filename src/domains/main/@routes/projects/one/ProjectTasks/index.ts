import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { destroy } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog/index';
import { isFormMount } from 'src/store/form/index';
import {
  deleteProjectTask,
  getAllProjectTasks,
  PROJECT_EDIT_TASK_FORM_NAME,
  projectTasks,
} from 'src/store/projects/index';
import { projectId } from 'src/store/router/index';
import { ProjectTasksJsx } from './ProjectTasks';
import { styles } from './styles';

export const ProjectTasks = connect(
  createStructuredSelector({
    isFormMount: isFormMount(PROJECT_EDIT_TASK_FORM_NAME),
    projectId,
    projectTasks,
  }),
  {
    closeDialog,
    deleteProjectTask,
    destroy,
    getAllProjectTasks,
    goToPage: push,
    openDialog,
  },
  (
    { projectId, ...restState }: any,
    { deleteProjectTask, destroy, getAllProjectTasks, goToPage, ...restDispatch }: any,
    { match, ...restOwn }: any
  ) => ({
    ...restState,
    ...restDispatch,
    deleteProjectTask: (taskId: number) => deleteProjectTask({ taskId, projectId }),
    destroyEditTaskForm: () => destroy(PROJECT_EDIT_TASK_FORM_NAME),
    getAllProjectTasks: () => getAllProjectTasks(projectId),
    projectId,
    ...restOwn,
  })
)(withStyles(styles, { withTheme: true })(ProjectTasksJsx));
