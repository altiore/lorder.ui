import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required, url } from 'redux-form-validators';

import { Input } from 'liw-components/Input';

import { parseNumber } from 'src/store/@common/helpers';

export interface ITaskFormData {
  description?: string;
  title?: string;
  projectId: number;
  value: number;
}

export interface ITaskFormProps {
  buttonText?: string;
  classes?: any;
  closeDialog: any;
  projectId: number;
  projectTasksIsLoading: boolean;
}

export class AddTaskFormJsx extends React.Component<
  ITaskFormProps & InjectedFormProps<ITaskFormData, ITaskFormProps>,
  {}
> {
  public render() {
    const { buttonText, classes, handleSubmit, projectTasksIsLoading } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes ? classes.form : ''}>
        <DialogContent>
          <Field
            name="title"
            component={Input}
            label="Название задачи"
            validate={[required({ msg: 'Обязательное поле' })]}
          />
          <Field name="description" component={Input} label="Описание задачи" />
          <Field
            name="source"
            component={Input}
            label="Ссылка на сторонний ресурс"
            validate={[url({ msg: 'Должно быть ссылкой!' })]}
          />
          <Field name="value" component={Input} parse={parseNumber} label="Оценка задачи" />
        </DialogContent>
        <DialogActions>
          <Button color="primary" disabled={projectTasksIsLoading} type="submit">
            {buttonText}
          </Button>
        </DialogActions>
      </form>
    );
  }
}
