import { connect } from 'react-redux';

import { push, replace } from 'connected-react-router';
import get from 'lodash/get';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail } from '#/@store/@common/helpers';
import { changeSettings } from '#/@store/dialog';
import { showSuccess } from '#/@store/notifications';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router';
import {
  archiveTask,
  checkIsCurrent,
  EDIT_TASK_FORM,
  fetchTaskDetails,
  getEditTaskInitialValues,
  patchProjectTask,
  postProjectTask,
  startUserWork,
} from '#/@store/tasks';

import { change, reduxForm } from 'redux-form';

import { ITaskFormData, ITaskFormProps, TaskFormJsx } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  checkIsCurrent,
  getEditTaskInitialValues,
  routeProjectId,
  routeTaskSequenceNumber,
} as any);

const mapDispatchToProps = {
  archiveTask,
  changeSettings,
  fetchTaskDetails,
  push,
  replace,
  showSuccess,
  startUserWork,
};

const mergeProps = (
  { checkIsCurrent, getEditTaskInitialValues, routeProjectId, routeTaskSequenceNumber, ...restState }: any,
  { ...restDispatch }: any,
  { sequenceNumber, projectId, initialValues, ...restOwn }: any
) => {
  const localSequenceNumber = sequenceNumber || routeTaskSequenceNumber;
  const localProjectId = projectId || routeProjectId;
  const preparedInitialValues =
    initialValues || (localSequenceNumber ? getEditTaskInitialValues(localProjectId, localSequenceNumber) : {});
  return {
    ...restState,
    initialValues: preparedInitialValues,
    isCurrent: checkIsCurrent(get(preparedInitialValues, 'id')),
    projectId: localProjectId,
    sequenceNumber: localSequenceNumber,
    ...restDispatch,
    ...restOwn,
  };
};

export const PatchTaskForm = connect<
  any,
  any,
  { buttonText?: string; taskId?: number | string; projectId?: number | string; initialValues?: Partial<ITaskFormData> }
>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(reduxForm<ITaskFormData, ITaskFormProps>({
  form: EDIT_TASK_FORM,
  onSubmit: async (values, dispatch, { projectId }: any) => {
    const val = { ...values, projectId };
    return val.id ? dispatch(patchProjectTask(val)) : dispatch(postProjectTask(val));
  },
  onSubmitFail,
  onSubmitSuccess: (result, dispatch) => {
    const actionType = get(result, 'meta.previousAction.type');
    const taskId = get(result, 'payload.data.id');
    if (actionType === postProjectTask.toString()) {
      dispatch(change(EDIT_TASK_FORM, 'id', taskId));
    }
  },
})(TaskFormJsx) as any);
