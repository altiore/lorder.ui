import Button from '@material-ui/core/Button';
import { Input } from 'liw-components/Input';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';

import { UserIco } from 'components/@icons/User';

export class IMagicFormProps {
  buttonText?: string;
}

export class MagicForm extends React.Component<IMagicFormProps & InjectedFormProps<{}, IMagicFormProps>, object> {
  render() {
    const { buttonText, handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <div styleName="wrapper">
        <form styleName="form" onSubmit={handleSubmit}>
          <Field autoComplete="username" name="email" component={Input} type="email" icon={<UserIco />} />
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
