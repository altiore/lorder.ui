import Button from '@material-ui/core/Button';
import { Input } from 'liw-components/Input';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';

import { PasswordIco as PassIco } from 'components/@icons/Password';
import { UserIco } from 'components/@icons/User';

export interface ILoginFormProps {
  buttonText?: string;
}

export class LoginFormJsx extends React.Component<ILoginFormProps & InjectedFormProps<{}, ILoginFormProps>, object> {
  render() {
    const { buttonText, handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <div styleName="wrapper">
        <form styleName="form" onSubmit={handleSubmit}>
          <Field autoComplete="username" name="email" component={Input} type="email" icon={<UserIco />} />
          <Field autoComplete="current-password" name="password" component={Input} type="password" icon={<PassIco />} />
          <Button
            type="submit"
            disabled={pristine || submitting || invalid}
            color="primary"
            variant="contained"
            fullWidth
          >
            <span>{buttonText}</span>
          </Button>
        </form>
      </div>
    );
  }
}
