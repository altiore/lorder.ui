import { connect } from 'react-redux';

import { push, replace } from 'connected-react-router';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { initialize, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail } from '#/@store/@common/helpers';
import { changeSettings } from '#/@store/dialog';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router';
import {
  checkIsCurrent,
  EDIT_TASK_FORM,
  EDIT_TASK_FORM_PROPS,
  fetchTaskDetails,
  getEditTaskInitialValues,
  patchProjectTask,
  postProjectTask,
} from '#/@store/tasks';
import { isPaused, startUserWork } from '#/@store/user-works';

import { ITaskFormData, ITaskFormProps, TaskFormJsx } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  checkIsCurrent,
  getEditTaskInitialValues,
  isPaused,
  routeProjectId,
  routeTaskSequenceNumber,
} as any);

const mapDispatchToProps = {
  changeSettings,
  fetchTaskDetails,
  push,
  replace,
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
    const data = get(result, 'payload.data');
    if (actionType === postProjectTask.toString()) {
      dispatch(initialize(EDIT_TASK_FORM, pick(data, EDIT_TASK_FORM_PROPS), false));
    }
  },
})(TaskFormJsx) as any);
