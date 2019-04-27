import * as CSSModules from 'react-css-modules';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'store/@common/helpers';
import { MAGIC_FORM_NAME, postAuthMagic } from 'store/identity';
import { IMagicFormProps, MagicForm as MagicFormJsx } from './MagicForm';
import * as s from './style.m.scss';

const MagicForm = reduxForm<{}, IMagicFormProps>({
  form: MAGIC_FORM_NAME,
  onSubmit: onSubmitForm(postAuthMagic),
})(CSSModules(MagicFormJsx, s));

export { MagicForm, IMagicFormProps };
