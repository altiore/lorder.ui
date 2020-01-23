import { reduxForm } from 'redux-form';

import { logIn, LOGIN_FORM_NAME } from '#/@store/identity';
import LoginFormJsx, { ILoginFormProps } from './LoginForm';

export const LoginForm = reduxForm<any, ILoginFormProps>({
  form: LOGIN_FORM_NAME,
  onSubmit: logIn,
})(LoginFormJsx);
