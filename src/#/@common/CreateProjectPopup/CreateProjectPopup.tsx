import React from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { TextField } from '@components/TextField';

import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

export class IProjectFormProps {
  goToPage: any;
  onClose: any;
  title?: string;
  buttonText?: string;
}

export const CreateProjectPopupJsx: React.FunctionComponent<
  IProjectFormProps & InjectedFormProps<{}, IProjectFormProps>
> = ({ handleSubmit, onClose }) => (
  <React.Fragment>
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
      </form>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        Cancel
      </Button>
      <Button color="primary" onClick={handleSubmit}>
        Создать проект
      </Button>
    </DialogActions>
  </React.Fragment>
);
