import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers';
import { closeDialog } from 'src/store/dialog';
import {
  getEditTaskInitialValues,
  patchProjectTask,
  PROJECT_TASK_FORM_NAME,
  projectTasksIsLoading,
} from 'src/store/projects';
import { projectId } from 'src/store/router';
import { AddTaskFormJsx, ITaskFormData, ITaskFormProps } from '../AddTaskForm/AddTaskForm';
import { styles } from './styles';

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
  form: PROJECT_TASK_FORM_NAME,
  onSubmit: onSubmitForm(patchProjectTask, props => ({ projectId: props.projectId })),
  onSubmitFail: () => true,
  onSubmitSuccess: (res, dispatch, { closeDialog }) => {
    closeDialog();
  },
})(withStyles(styles, { withTheme: true })(AddTaskFormJsx)) as any);
