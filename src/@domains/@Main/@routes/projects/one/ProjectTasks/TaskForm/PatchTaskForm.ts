import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from '@store/@common/helpers';
import { closeDialog } from '@store/dialog';
import {
  getSelectedProjectTaskById,
  patchProjectTask,
  PROJECT_EDIT_TASK_FORM_NAME,
  projectTasksIsLoading,
} from '@store/projects';
import { routeProjectId } from '@store/router';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  getEditTaskInitialValues: getSelectedProjectTaskById,
  projectId: routeProjectId,
  projectTasksIsLoading,
} as any);

const mapDispatchToProps = {
  closeDialog,
};

const mergeProps = (
  { getEditTaskInitialValues, ...restState }: any,
  restDispatch: any,
  { taskId, ...restOwn }: any
) => ({
  ...restState,
  initialValues: getEditTaskInitialValues(taskId),
  ...restDispatch,
  ...restOwn,
});

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
  onSubmit: onSubmitForm(patchProjectTask, props => ({ projectId: props.projectId })),
  onSubmitFail: () => true,
  onSubmitSuccess: (res, dispatch, { closeDialog }) => {
    closeDialog();
  },
})(TaskForm) as any);
