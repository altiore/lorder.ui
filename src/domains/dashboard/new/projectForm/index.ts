import * as CSSModules from 'react-css-modules';
import { reduxForm } from 'redux-form';

import { createProject } from 'src/store/projects'
import { IProjectFormProps, ProjectForm as ProjectFormJsx } from './ProjectForm';
import * as s from './style.m.scss';

const ProjectForm = reduxForm<{}, IProjectFormProps>({
  form: 'ProjectForm',
  onSubmit: createProject,
})(CSSModules(ProjectFormJsx, s));

export { ProjectForm, IProjectFormProps };
