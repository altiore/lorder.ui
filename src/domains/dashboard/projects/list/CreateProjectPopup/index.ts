import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'src/store/@common/helpers'
import { IPostProjectData, postProject } from 'src/store/projects';
import { CreateProjectPopupJsx, IProjectFormProps } from './CreateProjectPopup';

const CreateProjectPopup = reduxForm<{}, IProjectFormProps>({
  form: 'ProjectForm',
  onSubmit: onSubmitForm<IPostProjectData>(postProject),
  onSubmitSuccess: (res, dispatch, { onClose }) => onClose(),
})(CreateProjectPopupJsx);

export { CreateProjectPopup, IProjectFormProps };
