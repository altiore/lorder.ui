import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers';
import { closeDialog } from 'src/store/dialog';
import { postProjectTask, PROJECT_TASK_FORM_NAME, projectTasksIsLoading } from 'src/store/projects';
import { projectId } from 'src/store/router';
import { AddTaskFormJsx, IAddTaskFormProps } from './AddTaskForm';

const mapStateToProps = createStructuredSelector({
  projectId,
  projectTasksIsLoading,
});

const mapDispatchToProps = {
  closeDialog,
};

export const AddTaskForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm<{}, IAddTaskFormProps>({
  form: PROJECT_TASK_FORM_NAME,
  onSubmit: onSubmitForm<any>(postProjectTask, props => ({ projectId: props.projectId })),
  onSubmitFail: () => true,
  onSubmitSuccess: (res, dispatch, { closeDialog }) => {
    closeDialog();
  },
})(AddTaskFormJsx) as any);
