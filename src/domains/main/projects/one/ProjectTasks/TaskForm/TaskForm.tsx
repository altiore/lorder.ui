import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required, url } from 'redux-form-validators';

import { Input } from 'liw-components/Input';

import { nullIfEmpty, parseNumber } from 'src/store/@common/helpers';

export interface ITaskFormData {
  description?: string;
  title?: string;
  projectId: number;
  value: number;
}

export interface ITaskFormProps extends InjectedFormProps<ITaskFormData, ITaskFormProps> {
  buttonText?: string;
  classes?: any;
  closeDialog: any;
  projectId: number;
  projectTasksIsLoading: boolean;
}

export class TaskFormJsx extends React.Component<ITaskFormProps, {}> {
  public render() {
    const { classes, closeDialog, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.card}>
          <IconButton onClick={closeDialog} className={classes.close}>
            <CloseIcon fontSize={'small'} />
          </IconButton>
          <div className={classes.header}>
            <Field
              name="title"
              component={Input}
              label="Название задачи"
              validate={[required({ msg: 'Обязательное поле' })]}
            />
          </div>
          <Field name="description" component={Input} label="Описание задачи" />
          <Field
            name="source"
            component={Input}
            label="Ссылка на сторонний ресурс"
            parse={nullIfEmpty}
            validate={[url({ msg: 'Должно быть ссылкой!', if: (vv, v) => !!v })]}
          />
          <Field name="value" component={Input} parse={parseNumber} label="Оценка задачи" />
        </div>
      </form>
    );
  }
}
