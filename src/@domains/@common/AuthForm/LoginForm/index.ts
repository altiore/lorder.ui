import { withStyles } from '@material-ui/core/styles';
import { reduxForm } from 'redux-form';

import { onSubmitForm } from '@store/@common/helpers';
import { logIn, LOGIN_FORM_NAME } from '@store/identity';
import LoginFormJsx, { ILoginFormProps } from './LoginForm';
import { styles } from './styles';

export const LoginForm = withStyles(styles)(
  reduxForm<{}, ILoginFormProps>({
    form: LOGIN_FORM_NAME,
    onSubmit: onSubmitForm(logIn),
  })(LoginFormJsx)
);
