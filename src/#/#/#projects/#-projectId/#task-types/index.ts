import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
  addTaskTypeToProject,
  getAllProjectTaskTypes,
  projectTaskTypes,
  removeTaskTypeFromProject,
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
  getAllProjectTaskTypes,
  getAllTaskTypes,
  removeTaskTypeFromProject,
};

export default connect(mapState, mapDispatch)(ProjectTaskTypesJsx);
