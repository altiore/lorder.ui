import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers';
import { postProjectTask, PROJECT_MEMBER_FORM_NAME } from 'src/store/projects';
import { projectId } from 'src/store/router';
import { AddTaskFormJsx, IAddTaskFormProps } from './AddTaskForm';

const mapStateToProps = createStructuredSelector({
  projectId,
});

export const AddTaskForm = connect(mapStateToProps)(
  reduxForm<{}, IAddTaskFormProps>({
    form: PROJECT_MEMBER_FORM_NAME,
    onSubmit: onSubmitForm<any>(postProjectTask, props => ({ projectId: props.projectId })),
  })(AddTaskFormJsx)
);
