import { push, replace } from 'connected-react-router';
import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail } from '@store/@common/helpers';
import { changeSettings } from '@store/dialog';
import { showSuccess } from '@store/notifications';
import { patchProjectTask, postProjectTask, PROJECT_EDIT_TASK_FORM_NAME, projectTasksIsLoading } from '@store/projects';
import { routeProjectId, routeTaskId } from '@store/router';
import {
  archiveTask,
  checkIsCurrent,
  fetchTaskDetails,
  getEditTaskInitialValues,
  startUserWork,
  stopUserWork,
} from '@store/tasks';
import { ITaskFormData, ITaskFormProps, TaskFormJsx } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  checkIsCurrent,
  getEditTaskInitialValues,
  projectTasksIsLoading,
  routeProjectId,
  routeTaskId,
} as any);

const mapDispatchToProps = {
  archiveTask,
  changeSettings,
  fetchTaskDetails,
  push,
  replace,
  showSuccess,
  startUserWork,
  stopUserWork,
  submit,
};

const mergeProps = (
  { checkIsCurrent, getEditTaskInitialValues, routeProjectId, routeTaskId, ...restState }: any,
  { archiveTask, fetchTaskDetails, startUserWork, stopUserWork, submit, ...restDispatch }: any,
  { taskId, projectId, ...restOwn }: any
) => {
  const localTaskId = taskId || routeTaskId;
  const localProjectId = projectId || routeProjectId;
  return {
    ...restState,
    archiveTask: () => archiveTask({ taskId: localTaskId, projectId: localProjectId }),
    fetchTaskDetails: () => fetchTaskDetails(localTaskId),
    initialValues: getEditTaskInitialValues(localTaskId),
    isCurrent: checkIsCurrent(localTaskId),
    projectId: localProjectId,
    startUserWork: () => startUserWork({ taskId: localTaskId, projectId: localProjectId }),
    stopUserWork: () => {
      submit(PROJECT_EDIT_TASK_FORM_NAME);
      stopUserWork();
    },
    taskId: localTaskId,
    ...restDispatch,
    ...restOwn,
  };
};

export const DashboardTaskForm = connect<
  any,
  any,
  { buttonText?: string; taskId?: number | string; projectId?: number | string }
>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(reduxForm<ITaskFormData, ITaskFormProps>({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: PROJECT_EDIT_TASK_FORM_NAME,
  onSubmit: async (values, dispatch, { projectId }: any) => {
    const val = { ...values, projectId };
    return val.id ? dispatch(patchProjectTask(val)) : dispatch(postProjectTask(val));
  },
  onSubmitFail,
})(TaskFormJsx) as any);
