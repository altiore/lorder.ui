import * as CSSModules from 'react-css-modules';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'src/store/@common/helpers'
import { IPostProjectData, postProject } from 'src/store/projects';
import { IProjectFormProps, ProjectForm as ProjectFormJsx } from './ProjectForm';
import * as s from './style.m.scss';

const ProjectForm = reduxForm<{}, IProjectFormProps>({
  form: 'ProjectForm',
  onSubmit: onSubmitForm<IPostProjectData>(postProject),
  onSubmitSuccess: (res) => alert('Здесь должен быть переход на следующий шаг'),
})(CSSModules(ProjectFormJsx, s));

export { ProjectForm, IProjectFormProps };
