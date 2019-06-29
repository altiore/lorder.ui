import { reduxForm } from 'redux-form';

import { onSubmitForm } from '@store/@common/helpers';
import { IPostProjectData, postProject } from '@store/projects';
import { IProjectFormProps, ProjectForm as ProjectFormJsx } from './ProjectForm';

const ProjectForm = reduxForm<{}, IProjectFormProps>({
  form: 'ProjectForm',
  onSubmit: onSubmitForm<IPostProjectData>(postProject),
  onSubmitSuccess: (res, dispatch, { goToNext }) => goToNext(),
})(ProjectFormJsx);

export { ProjectForm };
