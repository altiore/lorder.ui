import get from 'lodash-es/get';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from '@store/@common/helpers';
import { IPostProjectData, postProject } from '@store/projects';
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
    onClose() && goToPage(`/projects/${get(res, 'payload.data.id')}`),
})(CreateProjectPopupJsx) as any);

export { CreateProjectPopup, IProjectFormProps };
