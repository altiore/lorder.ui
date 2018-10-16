import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers';
import { postProjectMember, PROJECT_MEMBER_FORM_NAME } from 'src/store/projects';
import { projectId } from 'src/store/router';
import { AddMemberFormJsx, IAddMemberFormProps } from './AddMemberForm';

const mapStateToProps = createStructuredSelector({
  projectId,
});

export const AddMemberForm = connect(mapStateToProps)(
  reduxForm<{}, IAddMemberFormProps>({
    form: PROJECT_MEMBER_FORM_NAME,
    onSubmit: onSubmitForm<any>(postProjectMember, props => ({ projectId: props.projectId })),
  })(AddMemberFormJsx)
);
