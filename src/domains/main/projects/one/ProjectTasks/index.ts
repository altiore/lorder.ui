import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { deleteProjectTask, projectTasks } from 'src/store/projects';
import { projectId } from 'src/store/router';
import { ProjectTasksJsx } from './ProjectTasks';
import { styles } from './styles';

export const ProjectTasks = connect(
  createStructuredSelector({
    projectId,
    projectTasks,
  }),
  {
    closeDialog,
    deleteProjectTask,
    goToPage: push,
    openDialog,
  },
  (
    { projectId, ...restState }: any,
    { deleteProjectTask, goToPage, ...restDispatch }: any,
    { match, ...restOwn }: any
  ) => ({
    ...restState,
    ...restDispatch,
    deleteProjectTask: (taskId: number) => deleteProjectTask({ taskId, projectId }),
    ...restOwn,
  })
)(withStyles(styles, { withTheme: true })(ProjectTasksJsx));
