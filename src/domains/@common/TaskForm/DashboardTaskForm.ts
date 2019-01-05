import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail, onSubmitForm } from 'src/store/@common/helpers';
import { closeDialog } from 'src/store/dialog';
import { patchProjectTask, PROJECT_EDIT_TASK_FORM_NAME, projectTasksIsLoading } from 'src/store/projects';
import { checkIsCurrent, getEditTaskInitialValues, startUserWork, stopUserWork } from 'src/store/tasks';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  checkIsCurrent,
  getEditTaskInitialValues,
  projectTasksIsLoading,
});

const mapDispatchToProps = {
  closeDialog,
  startUserWork,
  stopUserWork,
  submit,
};

const mergeProps = (
  { checkIsCurrent, getEditTaskInitialValues, ...restState }: any,
  { closeDialog, startUserWork, stopUserWork, submit, ...restDispatch }: any,
  { taskId, projectId, ...restOwn }: any
) => ({
  ...restState,
  closeDialog,
  initialValues: getEditTaskInitialValues(taskId),
  isCurrent: checkIsCurrent(taskId),
  projectId,
  startUserWork: () => startUserWork({ taskId, projectId }),
  stopUserWork: () => {
    submit(PROJECT_EDIT_TASK_FORM_NAME);
    stopUserWork();
  },
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
  onSubmit: onSubmitForm<{ projectId: number | string }>(patchProjectTask, ({ projectId }) => ({ projectId })),
  onSubmitFail,
})(TaskForm) as any);
