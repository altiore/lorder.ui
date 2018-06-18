import * as CSSModules from 'react-css-modules';
import { reduxForm } from 'redux-form';

import { ILoginFormProps, LoginForm as LoginFormJsx } from 'liw-components/LoginForm';
import * as s from './style.m.scss';

export const LoginForm = reduxForm<{}, ILoginFormProps>({
  form: 'LoginForm',
  onSubmit: (values) => console.log('onSubmit', values),
})(CSSModules(LoginFormJsx, s));
