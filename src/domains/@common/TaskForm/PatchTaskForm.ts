import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail, onSubmitForm } from 'src/store/@common/helpers';
import { closeDialog } from 'src/store/dialog';
import {
  getEditTaskInitialValues,
  patchProjectTask,
  PROJECT_EDIT_TASK_FORM_NAME,
  projectTasksIsLoading,
} from 'src/store/projects';
import { checkIsCurrent, startUserWork, stopUserWork } from 'src/store/tasks';
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
};

const mergeProps = (
  { checkIsCurrent, getEditTaskInitialValues, ...restState }: any,
  { closeDialog, startUserWork, stopUserWork, ...restDispatch }: any,
  { taskId, projectId, ...restOwn }: any
) => ({
  ...restState,
  closeDialog,
  initialValues: getEditTaskInitialValues(taskId, projectId),
  isCurrent: checkIsCurrent(taskId),
  projectId,
  startUserWork: () => startUserWork({ taskId, projectId }),
  stopUserWork: () => closeDialog() && stopUserWork(),
  ...restDispatch,
  ...restOwn,
});

export const PatchTaskForm = connect<
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
  onSubmit: onSubmitForm<{ projectId: number }>(patchProjectTask, ({ projectId }) => ({ projectId })),
  onSubmitFail,
  onSubmitSuccess: (res, dispatch, { closeDialog }) => {
    closeDialog();
  },
})(TaskForm) as any);
