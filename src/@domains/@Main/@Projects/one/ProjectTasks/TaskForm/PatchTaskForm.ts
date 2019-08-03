import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { closeDialog } from '@store/dialog';
import { getSelectedProjectTaskById, PROJECT_EDIT_TASK_FORM_NAME, projectTasksIsLoading } from '@store/projects';
import { onSubmitTaskForm } from '@store/projects/tasks';
import { routeProjectId } from '@store/router';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  getSelectedProjectTaskById,
  projectId: routeProjectId,
  projectTasksIsLoading,
} as any);

const mapDispatchToProps = {
  closeDialog,
};

const mergeProps = (
  { getSelectedProjectTaskById, ...restState }: any,
  restDispatch: any,
  { taskId, ...restOwn }: any
) => ({
  ...restState,
  initialValues: getSelectedProjectTaskById(taskId),
  ...restDispatch,
  ...restOwn,
});

function returnTrue() {
  return true;
}

export const PatchTaskForm = connect<
  any,
  any,
  { buttonText?: string; taskId: number | string; closeDialog: () => any }
>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(reduxForm<ITaskFormData, ITaskFormProps>({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: PROJECT_EDIT_TASK_FORM_NAME,
  onSubmit: onSubmitTaskForm,
  onSubmitFail: returnTrue,
  onSubmitSuccess: closeDialog,
})(TaskForm) as any);
