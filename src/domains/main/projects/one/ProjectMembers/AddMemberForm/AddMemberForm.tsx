import Button from '@material-ui/core/Button';
import * as React from 'react';
import { FaUser } from 'react-icons/fa';
import { Field, InjectedFormProps } from 'redux-form';
import { email, required } from 'redux-form-validators';

import { Input } from 'liw-components/Input';

export interface IAddMemberFormProps {
  buttonText?: string;
}

export class AddMemberFormJsx extends React.Component<
  IAddMemberFormProps & InjectedFormProps<{}, IAddMemberFormProps>,
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
