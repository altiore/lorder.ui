import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { openDialog } from '#/@store/dialog';
import { routeProjectId } from '#/@store/router';
import { fetchProjectTasks, filteredProjectTasks, moveProjectTask } from '#/@store/tasks';
import { filteredOpenedStatuses, toggleOpenedTab } from '#/@store/tasksFilter';

import { DragAndDrop } from './DragAndDrop';

import { withResize } from '@hooks/withResize';
import { IState } from '@types';

const mapState = createStructuredSelector<IState, { items: any[]; projectId?: number; openedStatuses: number[] }>({
  items: filteredProjectTasks,
  openedStatuses: filteredOpenedStatuses,
  projectId: routeProjectId,
});

const mapDispatch = {
  fetchProjectTasks,
  moveProjectTask,
  openDialog,
  push,
  toggleOpenedTab,
};

export default connect(
  mapState,
  mapDispatch
)(withResize(DragAndDrop));
