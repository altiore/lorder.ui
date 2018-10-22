import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { Input } from 'liw-components/Input';

import { parseNumber } from 'src/store/@common/helpers';

export interface IAddTaskFormProps extends InjectedFormProps<{}, IAddTaskFormProps> {
  buttonText?: string;
  closeDialog: any;
  projectTasksIsLoading: boolean;
}

export class AddTaskFormJsx extends React.Component<IAddTaskFormProps, {}> {
  public render() {
    const { handleSubmit, projectTasksIsLoading } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Field
            name="title"
            component={Input}
            label="Название задачи"
            validate={[required({ msg: 'Обязательное поле' })]}
          />
          <Field
            name="description"
            component={Input}
            label="Описание задачи"
            validate={[required({ msg: 'Обязательное поле' })]}
          />
          <Field name="value" component={Input} parse={parseNumber} label="Оценка задачи" />
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={projectTasksIsLoading} type="submit">
            Создать задачу
          </Button>
        </DialogActions>
      </form>
    );
  }
}
