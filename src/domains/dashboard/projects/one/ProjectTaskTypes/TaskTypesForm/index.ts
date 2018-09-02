import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { projectId } from 'src/store/router';
import { addTaskTypesToProject, filteredTaskTypes } from 'src/store/task-types';
import { ITaskTypesFormProps, TaskTypesFormJsx } from './TaskTypesForm';

const mapState = createStructuredSelector({
  filteredTaskTypes,
  projectId,
});

const mapDispatch = {
  addTaskTypesToProject,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { addTaskTypesToProject, ...restDispatch }: any,
  ownProps: any
) => ({
  addTaskType: (taskTypeId: number) => addTaskTypesToProject({ projectId, taskTypes: [taskTypeId] }),
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
