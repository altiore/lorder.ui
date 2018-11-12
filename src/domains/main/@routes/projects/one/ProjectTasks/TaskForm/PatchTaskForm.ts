import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers/index';
import { closeDialog } from 'src/store/dialog/index';
import {
  getEditTaskInitialValues,
  patchProjectTask,
  PROJECT_EDIT_TASK_FORM_NAME,
  projectTasksIsLoading,
} from 'src/store/projects/index';
import { projectId } from 'src/store/router/index';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  getEditTaskInitialValues,
  projectId,
  projectTasksIsLoading,
});

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
