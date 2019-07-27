import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from '@hooks/withResize';
import { openDialog } from '@store/dialog';
import { filteredProjectTasks, getAllProjectTasks, moveProjectTask } from '@store/projects';
import { routeProjectId } from '@store/router';
import { DragAndDrop } from './DragAndDrop';

const mapState = createStructuredSelector({
  items: filteredProjectTasks,
  projectId: routeProjectId,
} as any);

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
)(withResize(DragAndDrop));
