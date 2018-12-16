import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAllProjectTasks, moveProjectTask, projectTasks } from 'src/store/projects';
import { projectId } from 'src/store/router';
import { DragAndDrop } from './DragAndDrop';
import { styles } from './styles';

const mapState = createStructuredSelector({
  items: projectTasks,
  projectId,
});

const mapDispatch = {
  getAllProjectTasks,
  moveProjectTask,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { getAllProjectTasks, moveProjectTask, ...restDispatch }: any,
  { match, ...restOwn }: any
) => ({
  ...restState,
  ...restDispatch,
  getAllProjectTasks: () => getAllProjectTasks(projectId),
  moveProjectTask: (taskId: number, status: number, prevStatus: number) =>
    moveProjectTask({ projectId, taskId, status, prevStatus }),
  projectId,
  ...restOwn,
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(DragAndDrop));
