import Button from '@material-ui/core/Button';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { email, required } from 'redux-form-validators';
const FaUser = require('react-icons/lib/fa/user');

import { Input } from 'liw-components/Input';

export interface IAddTaskFormProps {
  buttonText?: string;
}

export class AddTaskFormJsx extends React.Component<
  IAddTaskFormProps & InjectedFormProps<{}, IAddTaskFormProps>,
  object
> {
  public render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          component={Input}
          type="email"
          icon={<FaUser />}
          validate={[required({ msg: 'Обязательное поле' }), email({ msg: 'Неверный e-mail' })]}
        />
        <Button
          type="submit"
          disabled={pristine || submitting || invalid}
          color="primary"
          variant="contained"
          fullWidth
        >
          <span>Пригласить</span>
        </Button>
      </form>
    );
  }
}
