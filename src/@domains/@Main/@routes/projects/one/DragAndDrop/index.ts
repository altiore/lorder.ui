import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from '@hooks/withResize';
import { openDialog } from '@store/dialog';
import { filteredProjectTasks, getAllProjectTasks, moveProjectTask } from '@store/projects';
import { routeProjectId } from '@store/router';
import { DragAndDrop } from './DragAndDrop';
import { IState } from '@types';

const mapState = createStructuredSelector<IState, { items: any[]; projectId?: number }>({
  items: filteredProjectTasks,
  projectId: routeProjectId,
});

const mapDispatch = {
  getAllProjectTasks,
  moveProjectTask,
  openDialog,
  push,
};

export default connect(
  mapState,
  mapDispatch
)(withResize(DragAndDrop));
