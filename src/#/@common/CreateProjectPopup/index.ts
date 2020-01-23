import { push } from 'connected-react-router';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from '#/@store/@common/helpers';
import { IPostProjectData, postProject } from '#/@store/projects';
import { CreateProjectPopupJsx, IProjectFormProps } from './CreateProjectPopup';

const CreateProjectPopup = connect(
  undefined,
  {
    goToPage: push,
  }
)(reduxForm<{}, IProjectFormProps>({
  form: 'ProjectForm',
  onSubmit: onSubmitForm<IPostProjectData>(postProject),
  onSubmitFail: () => true,
  onSubmitSuccess: (res, dispatch, { onClose, goToPage }) =>
    onClose() && setTimeout(() => goToPage(`/projects/${get(res, 'payload.data.id')}`), 500),
})(CreateProjectPopupJsx) as any);

export { CreateProjectPopup, IProjectFormProps };
