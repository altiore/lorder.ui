import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'src/store/@common/helpers'
import { IPostProjectData, postProject } from 'src/store/projects';
import { ITaskTypesFormProps, TaskTypesFormJsx } from './TaskTypesForm';

const TaskTypesForm = reduxForm<{}, ITaskTypesFormProps>({
  form: 'TasksForm',
  onSubmit: onSubmitForm<IPostProjectData>(postProject),
  onSubmitSuccess: (res, dispatch, { goToNext }) => goToNext(),
})(TaskTypesFormJsx);

export { TaskTypesForm, ITaskTypesFormProps };
