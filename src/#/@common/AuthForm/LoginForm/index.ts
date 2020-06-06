import { Dispatch } from 'redux';
import { reduxForm } from 'redux-form';

import { openDialog } from '#/@store/dialog';
import { authWithPassword, LOGIN_FORM_NAME } from '#/@store/identity';

import LoginFormJsx, { ILoginFormProps } from './LoginForm';
import WrongPasswordDialog from './wrong-password.dialog';

export const LoginForm = reduxForm<any, ILoginFormProps>({
  form: LOGIN_FORM_NAME,
  onSubmit: authWithPassword,
  onSubmitFail(_, dispatch: Dispatch<any>): void {
    dispatch(openDialog(WrongPasswordDialog));
  },
})(LoginFormJsx);
