import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
  addTaskTypeToProject,
  deleteTaskTypeFromProject,
  getAllProjectTaskTypes,
  projectTaskTypes,
} from '#/@store/projects';
import { routeProjectId } from '#/@store/router';
import { getAllTaskTypes, getTaskTypeById, taskTypeList } from '#/@store/task-types';

import { ProjectTaskTypesJsx } from './task-types';

const mapState = createStructuredSelector({
  getTaskTypeById,
  projectId: routeProjectId,
  projectTaskTypes,
  taskTypeList,
} as any);

const mapDispatch = {
  addTaskTypeToProject,
  deleteTaskTypeFromProject,
  getAllProjectTaskTypes,
  getAllTaskTypes,
};

export default connect(mapState, mapDispatch)(ProjectTaskTypesJsx);
