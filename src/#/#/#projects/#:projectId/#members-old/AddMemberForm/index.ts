import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { onSubmitForm } from '#/@store/@common/helpers';
import { postProjectMember, PROJECT_MEMBER_FORM_NAME } from '#/@store/projects';
import { routeProjectId } from '#/@store/router';

import { reduxForm } from 'redux-form';

import { AddMemberFormJsx, IAddMemberFormProps } from './AddMemberForm';

const mapStateToProps = createStructuredSelector({
  projectId: routeProjectId,
} as any);

export const AddMemberForm = connect(mapStateToProps)(
  reduxForm<{}, IAddMemberFormProps>({
    form: PROJECT_MEMBER_FORM_NAME,
    onSubmit: onSubmitForm<any>(postProjectMember, props => ({ projectId: props.projectId })),
  })(AddMemberFormJsx)
);
