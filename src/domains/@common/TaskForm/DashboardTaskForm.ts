import { replace } from 'connected-react-router';
import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail, onSubmitForm } from 'src/store/@common/helpers';
import { patchProjectTask, PROJECT_EDIT_TASK_FORM_NAME, projectTasksIsLoading } from 'src/store/projects';
import {
  archiveTask,
  checkIsCurrent,
  fetchTaskDetails,
  getEditTaskInitialValues,
  startUserWork,
  stopUserWork,
} from 'src/store/tasks';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  checkIsCurrent,
  getEditTaskInitialValues,
  projectTasksIsLoading,
});

const mapDispatchToProps = {
  archiveTask,
  fetchTaskDetails,
  replace,
  startUserWork,
  stopUserWork,
  submit,
};

const mergeProps = (
  { checkIsCurrent, getEditTaskInitialValues, ...restState }: any,
  { archiveTask, fetchTaskDetails, startUserWork, stopUserWork, submit, ...restDispatch }: any,
  { taskId, projectId, ...restOwn }: any
) => ({
  ...restState,
  archiveTask: () => archiveTask(taskId),
  fetchTaskDetails: () => fetchTaskDetails(taskId),
  initialValues: getEditTaskInitialValues(taskId),
  isCurrent: checkIsCurrent(taskId),
  projectId,
  startUserWork: () => startUserWork({ taskId, projectId }),
  stopUserWork: () => {
    submit(PROJECT_EDIT_TASK_FORM_NAME);
    stopUserWork();
  },
  taskId,
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
