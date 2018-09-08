import * as CSSModules from 'react-css-modules';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from 'src/store/@common/helpers';
import { logIn, LoginFormName } from 'src/store/identity';
import { ILoginFormProps, LoginFormJsx } from './LoginForm';
import * as s from './style.m.scss';

export const LoginForm = reduxForm<{}, ILoginFormProps>({
  form: LoginFormName,
  onSubmit: onSubmitForm(logIn),
})(CSSModules(LoginFormJsx, s));
