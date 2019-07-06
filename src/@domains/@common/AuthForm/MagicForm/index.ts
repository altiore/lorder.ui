import { reduxForm } from 'redux-form';

import { onSubmitForm } from '@store/@common/helpers';
import { MAGIC_FORM_NAME, postAuthMagic } from '@store/identity';
import MagicFormJsx, { IMagicFormProps } from './MagicForm';

const MagicForm = reduxForm<any, IMagicFormProps>({
  form: MAGIC_FORM_NAME,
  onSubmit: onSubmitForm(postAuthMagic),
})(MagicFormJsx);

export { MagicForm, IMagicFormProps };
