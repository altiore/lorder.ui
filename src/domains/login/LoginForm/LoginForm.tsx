import Button from '@material-ui/core/Button';
import { Input } from 'liw-components/Input';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';

import { PasswordIco } from 'src/domains/@icons/Password';
import { UserIco } from 'src/domains/@icons/User';

export interface ILoginFormProps {
  buttonText?: string;
}

export class LoginFormJsx extends React.Component<ILoginFormProps & InjectedFormProps<{}, ILoginFormProps>, object> {
  public render() {
    const { buttonText, handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <div styleName="wrapper">
        <form styleName="form" onSubmit={handleSubmit}>
          <Field name="email" component={Input} type="email" icon={<UserIco />} />
          <Field name="password" component={Input} type="password" icon={<PasswordIco />} />
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
