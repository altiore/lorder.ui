import { onSubmitForm } from '#/@store/@common/helpers';
import { LOGIN_FORM_NAME, postAuthMagic } from '#/@store/identity';

import { reduxForm } from 'redux-form';

import MagicFormJsx, { IMagicFormProps } from './MagicForm';

const MagicForm = reduxForm<any, IMagicFormProps>({
  form: LOGIN_FORM_NAME,
  onSubmit: onSubmitForm(postAuthMagic),
})(MagicFormJsx);

export { MagicForm, IMagicFormProps };
