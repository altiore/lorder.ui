import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { Input } from 'liw-components/Input';

export interface IAddTaskFormProps {
  buttonText?: string;
}

export class AddTaskFormJsx extends React.Component<
  IAddTaskFormProps & InjectedFormProps<{}, IAddTaskFormProps>,
  object
> {
  public render() {
    const { handleSubmit } = this.props;
    return (
      <React.Fragment>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Field
              name="title"
              component={Input}
              label="Название задачи"
              validate={[required({ msg: 'Обязательное поле' })]}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleSubmit}>
            Создать задачу
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}
