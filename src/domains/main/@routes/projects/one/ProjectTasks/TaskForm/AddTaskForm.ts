import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers/index';
import { closeDialog } from 'src/store/dialog/index';
import { postProjectTask, PROJECT_TASK_FORM_NAME, projectTasksIsLoading } from 'src/store/projects/index';
import { projectId } from 'src/store/router/index';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  projectId,
  projectTasksIsLoading,
});

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
})(TaskForm) as any);
