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
  EDIT_TASK_FORM,
  EDIT_TASK_FORM_PROPS,
  fetchTaskDetails,
  getEditTaskInitialValues,
  isCurrent,
  patchProjectTask,
  postProjectTask,
} from '#/@store/tasks';
import { isPaused, startUserWork } from '#/@store/user-works';

import { ITaskFormData, ITaskFormProps, TaskFormJsx } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  getEditTaskInitialValues,
  isCurrent,
  isPaused,
  projectId: routeProjectId,
  sequenceNumber: routeTaskSequenceNumber,
} as any);

const mapDispatchToProps = {
  changeSettings,
  fetchTaskDetails,
  push,
  replace,
  startUserWork,
};

export const PatchTaskForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm<ITaskFormData, ITaskFormProps>({
    destroyOnUnmount: false,
    enableReinitialize: false,
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
  })(TaskFormJsx) as any
) as any;
