import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from '@store/@common/helpers';
import { closeDialog } from '@store/dialog';
import { postProjectTask, PROJECT_TASK_FORM_NAME, projectTasksIsLoading } from '@store/projects';
import { routeProjectId } from '@store/router';
import { ITaskFormData, ITaskFormProps, TaskFormJsx } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  projectId: routeProjectId,
  projectTasksIsLoading,
} as any);

const mapDispatchToProps = {
  closeDialog,
};

export const AddTaskForm = connect<any, any, { buttonText?: string }>(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm<ITaskFormData, ITaskFormProps>({
  form: PROJECT_TASK_FORM_NAME,
  onSubmit: onSubmitForm(postProjectTask, props => ({ projectId: props.projectId })),
  onSubmitFail: () => true,
  onSubmitSuccess: (res, dispatch, { closeDialog }) => {
    closeDialog();
  },
})(TaskFormJsx) as any);
