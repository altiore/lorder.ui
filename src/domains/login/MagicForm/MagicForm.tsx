import Button from '@material-ui/core/Button';
import * as React from 'react';
import { FaUser } from 'react-icons/fa';
import { Field, InjectedFormProps } from 'redux-form';

import { Input } from 'liw-components/Input';

export interface IMagicFormProps {
  buttonText?: string;
}

export class MagicForm extends React.Component<IMagicFormProps & InjectedFormProps<{}, IMagicFormProps>, object> {
  public render() {
    const { buttonText, handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <div styleName="wrapper">
        <form styleName="form" onSubmit={handleSubmit}>
          <Field name="email" component={Input} type="email" icon={<FaUser />} />
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
