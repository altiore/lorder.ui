import Button from '@material-ui/core/Button';
import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { email } from 'redux-form-validators';

import { UserIco } from '@components/@icons/User';
import InputField from '@components/InputField';

export class IMagicFormProps {
  autoFocus?: boolean;
  classes?: any;
}

const MagicForm: React.FC<IMagicFormProps & InjectedFormProps<{}, IMagicFormProps>> = ({
  autoFocus,
  classes,
  handleSubmit,
  // pristine,
  submitting,
  // invalid,
}) => {
  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Field
          autoComplete="username"
          autoFocus={autoFocus}
          component={InputField}
          icon={<UserIco />}
          name="email"
          placeholder="Введите email..."
          type="email"
          validate={[email({ msg: 'Введите валидный email-адрес' })]}
        />
        <Button color="secondary" disabled={submitting} fullWidth type="submit" variant="outlined">
          <span>Отправить магическую ссылку</span>
        </Button>
      </form>
    </div>
  );
};

export default MagicForm;
