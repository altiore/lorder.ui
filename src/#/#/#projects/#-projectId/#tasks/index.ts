import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { destroy } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { openDialog } from '#/@store/dialog';
import { getProjectStrategyByProjectId, projectRoleColumns } from '#/@store/projects';
import { routeProjectId } from '#/@store/router';
import { fetchProjectTasks, filteredProjectTasks, moveProjectTask } from '#/@store/tasks';
import { filteredOpenedStatuses, toggleOpenedTab } from '#/@store/tasksFilter';

import { DragAndDrop } from './DragAndDrop';

import { withResize } from '@hooks/withResize';
import { IState, ITaskColumn } from '@types';

interface IDragAndDropMappedProps {
  columns: ITaskColumn[];
  items: any[];
  projectId?: number;
  openedStatuses: string[];
  getProjectStrategyByProjectId: (projectId: number) => string;
}

const mapState = createStructuredSelector<IState, IDragAndDropMappedProps>({
  columns: projectRoleColumns,
  getProjectStrategyByProjectId,
  items: filteredProjectTasks,
  openedStatuses: filteredOpenedStatuses,
  projectId: routeProjectId,
});

const mapDispatch = {
  destroy,
  fetchProjectTasks,
  moveProjectTask,
  openDialog,
  push,
  toggleOpenedTab,
};

export default connect(mapState, mapDispatch)(withResize(DragAndDrop));
