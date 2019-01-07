import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitFail, onSubmitForm } from 'src/store/@common/helpers';
import { closeDialog } from 'src/store/dialog';
import { postProjectTask, PROJECT_TASK_FORM_NAME, projectTasksIsLoading } from 'src/store/projects';
import { startUserWork, stopUserWork } from 'src/store/tasks';
import { TaskForm } from './StyledTaskForm';
import { ITaskFormData, ITaskFormProps } from './TaskForm';

const mapStateToProps = createStructuredSelector({
  projectTasksIsLoading,
});

const mapDispatchToProps = {
  closeDialog,
  startUserWork,
  stopUserWork,
};

export const AddTaskForm = connect<
  any,
  any,
  { buttonText?: string; projectId: number | string; initialValues: Partial<ITaskFormData> }
>(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm<ITaskFormData, ITaskFormProps>({
  form: PROJECT_TASK_FORM_NAME,
  onSubmit: onSubmitForm<{ projectId: number }>(postProjectTask, ({ projectId }) => ({ projectId })),
  onSubmitFail,
})(TaskForm) as any);
