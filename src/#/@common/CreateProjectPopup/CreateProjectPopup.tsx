import React from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { PROJECT_TYPE } from '@types';
import { TextField } from '@components/TextField';
import { SwitchField } from '@components/SwitchField'

import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { useStyles } from './styles';

export class IProjectFormProps{
  goToPage: any;
  onClose: any;
  title?: string;
  type?: string;
  buttonText?: string;
}


export const CreateProjectPopupJsx: React.FunctionComponent<
  IProjectFormProps & InjectedFormProps<{}, IProjectFormProps>
> = ({ handleSubmit, onClose }) => {
  const classes = useStyles();

  return (<React.Fragment>
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <Field
          autoFocus
          name="title"
          component={TextField}
          margin="normal"
          // icon={<ProjectIco />}
          label="Название проекта"
          validate={[required({ msg: 'Обязательное поле' })]}
        />
        <div className={classes.textRight}>
          <Field
            name="type"
            component={SwitchField}
            label="Личный"
            on={PROJECT_TYPE.PERSONALLY_USEFUL}
            off={PROJECT_TYPE.SOCIALLY_USEFUL}
          />
        </div>
      </form>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        Отмена
      </Button>
      <Button color="primary" onClick={handleSubmit}>
        Создать проект
      </Button>
    </DialogActions>
  </React.Fragment>
)};
