import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addTaskTypeToProject, postTaskTypeToProject } from 'src/store/projects';
import { routeProjectId } from 'src/store/router';
import { filteredTaskTypes } from 'src/store/task-types';
import { ITaskTypesFormProps, TaskTypesFormJsx } from './TaskTypesForm';

const mapState = createStructuredSelector({
  filteredTaskTypes,
  projectId: routeProjectId,
});

const mapDispatch = {
  addTaskTypeToProject,
  postTaskTypeToProject,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { addTaskTypeToProject, postTaskTypeToProject, ...restDispatch }: any,
  ownProps: any
) => ({
  addTaskType: (taskTypeId: number) => addTaskTypeToProject({ projectId, taskTypeId }),
  postTaskTypeToProject: (title: string) => postTaskTypeToProject({ projectId, title }),
  ...restState,
  ...restDispatch,
  ...ownProps,
});

const TaskTypesForm = connect(
  mapState,
  mapDispatch,
  mergeProps
)(TaskTypesFormJsx);

export { TaskTypesForm, ITaskTypesFormProps };
