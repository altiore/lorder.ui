import Button from '@material-ui/core/Button';
import * as React from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { Field, InjectedFormProps } from 'redux-form';

import { Input } from 'liw-components/Input';

export interface ILoginFormProps {
  buttonText?: string;
}

export class LoginFormJsx extends React.Component<ILoginFormProps & InjectedFormProps<{}, ILoginFormProps>, object> {
  public render() {
    const { buttonText, handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <div styleName="wrapper">
        <form styleName="form" onSubmit={handleSubmit}>
          <Field name="email" component={Input} type="email" icon={<FaUser />} />
          <Field name="password" component={Input} type="password" icon={<FaLock />} />
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
