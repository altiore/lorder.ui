import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers';
import { closeDialog } from 'src/store/dialog';
import { postProjectTask, PROJECT_TASK_FORM_NAME, projectTasksIsLoading } from 'src/store/projects';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  projectTasksIsLoading,
});

const mapDispatchToProps = {
  closeDialog,
};

export const AddTaskForm = connect<any, any, { buttonText?: string; projectId: number | string }>(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm<ITaskFormData, ITaskFormProps>({
  form: PROJECT_TASK_FORM_NAME,
  onSubmit: onSubmitForm(postProjectTask, props => ({ projectId: props.projectId })),
  onSubmitFail: () => true,
  onSubmitSuccess: (res, dispatch, { closeDialog }) => {
    closeDialog();
  },
})(TaskForm) as any);
