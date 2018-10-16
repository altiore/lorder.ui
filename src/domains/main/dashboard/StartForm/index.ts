import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'src/store/@common/helpers';
import { IPostProjectData, postProject } from 'src/store/projects';
import { IStartFormProps, StartFormJsx } from './StartForm';

const StartForm = reduxForm<{}, IStartFormProps>({
  form: 'StartTaskForm',
  onSubmit: onSubmitForm<IPostProjectData>(postProject),
  // onSubmitSuccess: (res, dispatch, { goToNext }) => goToNext(),
})(StartFormJsx);

export { StartForm, IStartFormProps };
