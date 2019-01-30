import { replace } from 'connected-react-router';
import get from 'lodash-es/get';
import { connect } from 'react-redux';
import { change, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail } from 'src/store/@common/helpers';
import {
  patchProjectTask,
  postProjectTask,
  PROJECT_EDIT_TASK_FORM_NAME,
  projectTasksIsLoading,
} from 'src/store/projects';
import { routeProjectId, routeTaskId } from 'src/store/router';
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
  routeProjectId,
  routeTaskId,
});

const mapDispatchToProps = {
  archiveTask,
  fetchTaskDetails,
  replace,
  startUserWork,
  stopUserWork,
};

const mergeProps = (
  { checkIsCurrent, getEditTaskInitialValues, routeProjectId, routeTaskId, ...restState }: any,
  { archiveTask, fetchTaskDetails, startUserWork, stopUserWork, ...restDispatch }: any,
  { taskId, projectId, initialValues, ...restOwn }: any
) => {
  const localTaskId = taskId || routeTaskId;
  const localProjectId = projectId || routeProjectId;
  return {
    ...restState,
    archiveTask: () => archiveTask(taskId),
    fetchTaskDetails: () => fetchTaskDetails(localTaskId),
    initialValues: initialValues || (localTaskId ? getEditTaskInitialValues(localTaskId) : {}),
    isCurrent: checkIsCurrent(taskId),
    projectId,
    startUserWork: () => startUserWork({ taskId: localTaskId, projectId: localProjectId }),
    stopUserWork,
    taskId: localTaskId,
    ...restDispatch,
    ...restOwn,
  };
};

export const PatchTaskForm = connect<
  any,
  any,
  { buttonText?: string; taskId?: number | string; projectId: number | string; initialValues?: Partial<ITaskFormData> }
>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(reduxForm<ITaskFormData, ITaskFormProps>({
  enableReinitialize: true,
  form: PROJECT_EDIT_TASK_FORM_NAME,
  onSubmit: async (values, dispatch, { projectId }: any) => {
    const val = { ...values, projectId };
    return val.id ? dispatch(patchProjectTask(val)) : dispatch(postProjectTask(val));
  },
  onSubmitFail,
  onSubmitSuccess: (result, dispatch) => {
    const actionType = get(result, 'meta.previousAction.type');
    const taskId = get(result, 'payload.data.id');
    if (actionType === postProjectTask.toString()) {
      dispatch(change(PROJECT_EDIT_TASK_FORM_NAME, 'id', taskId));
    }
  },
})(TaskForm) as any);
