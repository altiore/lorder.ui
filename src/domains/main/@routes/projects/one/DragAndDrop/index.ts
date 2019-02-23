import { withStyles } from '@material-ui/core';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from 'src/hocs/withResize';
import { openDialog } from 'src/store/dialog';
import { filteredProjectTasks, getAllProjectTasks, moveProjectTask } from 'src/store/projects';
import { routeProjectId } from 'src/store/router';
import { DragAndDrop } from './DragAndDrop';
import { styles } from './styles';

const mapState = createStructuredSelector({
  items: filteredProjectTasks,
  projectId: routeProjectId,
});

const mapDispatch = {
  getAllProjectTasks,
  moveProjectTask,
  openDialog,
  push,
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
)(withResize(withStyles(styles, { withTheme: true })(DragAndDrop)));
