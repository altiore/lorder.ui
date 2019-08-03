import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '@store/dialog';
import { isFormMount } from '@store/form';
import { deleteProjectTask, getAllProjectTasks, PROJECT_EDIT_TASK_FORM_NAME, projectTasks } from '@store/projects';
import { routeProjectId } from '@store/router';
import { ProjectTasksJsx } from './ProjectTasks';
import { styles } from './styles';
import { IState } from '@types';

const mapState = createStructuredSelector<IState, any>({
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

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(ProjectTasksJsx));
