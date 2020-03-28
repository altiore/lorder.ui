import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { closeDialog, openDialog } from '#/@store/dialog';
import { isFormMount } from '#/@store/form';
import { routeProjectId } from '#/@store/router';
import { deleteProjectTask, EDIT_TASK_FORM, fetchProjectTasks, projectTasks } from '#/@store/tasks';

import { destroy } from 'redux-form';

import { ProjectTasksJsx } from './ProjectTasks';
import { styles } from './styles';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, any>({
  isFormMount: isFormMount(EDIT_TASK_FORM),
  projectId: routeProjectId,
  projectTasks,
});

const mapDispatch = {
  closeDialog,
  deleteProjectTask,
  destroy,
  fetchProjectTasks,
  openDialog,
  push,
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(ProjectTasksJsx));
