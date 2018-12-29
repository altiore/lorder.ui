import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail, onSubmitForm } from 'src/store/@common/helpers';
import { closeDialog } from 'src/store/dialog';
import { patchProjectTask, PROJECT_EDIT_TASK_FORM_NAME, projectTasksIsLoading } from 'src/store/projects';
import { getEditTaskInitialValues } from 'src/store/tasks';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  getEditTaskInitialValues,
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

export const DashboardTaskForm = connect<
  any,
  any,
  { buttonText?: string; taskId: number | string; projectId: number | string }
>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(reduxForm<ITaskFormData, ITaskFormProps>({
  enableReinitialize: true,
  form: PROJECT_EDIT_TASK_FORM_NAME,
  onSubmit: onSubmitForm(patchProjectTask, ({ projectId }) => ({ projectId })),
  onSubmitFail,
  onSubmitSuccess: (res, dispatch, { closeDialog }) => {
    closeDialog();
  },
})(TaskForm) as any);
