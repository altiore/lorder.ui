import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required, url } from 'redux-form-validators';

import { Input } from 'liw-components/Input';
import { TitleInput } from 'liw-components/TitleInput';

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
    const { buttonText, classes, closeDialog, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.card}>
          <IconButton onClick={closeDialog} className={classes.close}>
            <CloseIcon fontSize={'small'} />
          </IconButton>
          <div className={classes.header}>
            <Field bold name="title" component={TitleInput} validate={[required({ msg: 'Обязательное поле' })]} />
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
        <DialogActions>
          <Button color="primary" type="submit">
            {buttonText}
          </Button>
        </DialogActions>
      </form>
    );
  }
}
