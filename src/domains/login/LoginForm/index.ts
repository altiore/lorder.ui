import * as CSSModules from 'react-css-modules';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'store/@common/helpers';
import { logIn, LOGIN_FORM_NAME } from 'store/identity';
import { ILoginFormProps, LoginFormJsx } from './LoginForm';
import * as s from './style.m.scss';

export const LoginForm = reduxForm<{}, ILoginFormProps>({
  form: LOGIN_FORM_NAME,
  onSubmit: onSubmitForm(logIn),
})(CSSModules(LoginFormJsx, s));
