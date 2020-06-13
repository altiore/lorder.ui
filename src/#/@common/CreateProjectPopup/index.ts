import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import get from 'lodash/get';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from '#/@store/@common/helpers';
import { IPostProjectData, postProject } from '#/@store/projects';

import { CreateProjectPopupJsx } from './CreateProjectPopup';

import { PROJECT_TYPE } from '@types';

const mapDispatch = {
  goToPage: push,
};

const CreateProjectPopup = connect(
  undefined,
  mapDispatch
)(
  reduxForm<{}, any>({
    form: 'ProjectForm',
    initialValues: {
      type: PROJECT_TYPE.SOCIALLY_USEFUL,
    },
    onSubmit: onSubmitForm<IPostProjectData>(postProject),
    onSubmitFail: () => true,
    onSubmitSuccess: (res, dispatch, { onClose, goToPage }) =>
      onClose() && setTimeout(() => goToPage(`/projects/${get(res, 'payload.data.id')}`), 500),
  })(CreateProjectPopupJsx) as any
);

export { CreateProjectPopup };
