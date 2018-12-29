import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import EventIcon from '@material-ui/icons/Event';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required, url } from 'redux-form-validators';

import { Input } from 'liw-components/Input';
import { TextArea } from 'liw-components/TextArea';
import { TitleInput } from 'liw-components/TitleInput';

import { StartStopBtn } from 'src/components/StartStopBtn';
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
  isCurrent?: boolean;
  projectTasksIsLoading: boolean;
  startUserWork?: any;
  stopUserWork: any;
}

export class TaskFormJsx extends React.PureComponent<ITaskFormProps, {}> {
  render() {
    const {
      buttonText,
      classes,
      closeDialog,
      isCurrent,
      handleSubmit,
      submitting,
      startUserWork,
      stopUserWork,
    } = this.props;
    return (
      <>
        <DialogTitle disableTypography>
          <Fab size="small" color="secondary" onClick={closeDialog}>
            <CloseIcon fontSize={'small'} />
          </Fab>
        </DialogTitle>
        <DialogContent className={classes.card}>
          <form onSubmit={handleSubmit}>
            <div className={classes.header}>
              <Field
                bold
                icon={<EventIcon />}
                name="title"
                component={TitleInput}
                validate={[required({ msg: 'Обязательное поле' })]}
              />
            </div>
            <Field
              name="description"
              icon={<AssignmentIcon />}
              component={TextArea}
              title={'Описание'}
              placeholder={'Введи ваше описание'}
            />
            <div className={classes.field}>
              <Field
                name="source"
                component={Input}
                label="Ссылка на сторонний ресурс"
                parse={nullIfEmpty}
                validate={[url({ msg: 'Должно быть ссылкой!', if: (vv, v) => !!v })]}
              />
            </div>
            <div className={classes.field}>
              <Field name="value" component={Input} parse={parseNumber} label="Оценка задачи" />
            </div>
            <button style={{ display: 'none' }} type="submit">
              Эта кнопка нужна, чтоб работало сохранение с клавиатуры
            </button>
          </form>
        </DialogContent>
        <DialogActions key={'actions'}>
          <Button color="secondary" variant="contained" onClick={closeDialog}>
            Отмена
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit} disabled={submitting}>
            {buttonText}
            {submitting && '...'}
          </Button>
          {isCurrent !== undefined && (
            <StartStopBtn isStarted={isCurrent} onStart={startUserWork} onStop={stopUserWork} />
          )}
        </DialogActions>
      </>
    );
  }
}
