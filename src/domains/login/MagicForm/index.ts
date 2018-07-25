import * as CSSModules from 'react-css-modules';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'src/store/@common/helpers'
import { postAuthMagic } from 'src/store/identity'
import { IMagicFormProps, MagicForm as MagicFormJsx } from './MagicForm';
import * as s from './style.m.scss';

const MagicForm = reduxForm<{}, IMagicFormProps>({
  form: 'MagicForm',
  onSubmit: onSubmitForm(postAuthMagic),
})(CSSModules(MagicFormJsx, s));

export { MagicForm, IMagicFormProps };
