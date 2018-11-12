import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from 'src/store/@common/helpers/index';
import { postProjectMember, PROJECT_MEMBER_FORM_NAME } from 'src/store/projects/index';
import { projectId } from 'src/store/router/index';
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
