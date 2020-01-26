import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { isFormMount } from '#/@store/form';
import { deleteProjectTask, EDIT_TASK_FORM, fetchProjectTasks, projectTasks } from '#/@store/tasks';
import { routeProjectId } from '#/@store/router';
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
