import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField } from '@components/TextField';
import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { MoneyIco } from '@components/@icons/Money';
import { ProjectIco } from '@components/@icons/Project';

export class IProjectFormProps {
  goToPage: any;
  onClose: any;
  title?: string;
  buttonText?: string;
}

export const CreateProjectPopupJsx: React.StatelessComponent<
  IProjectFormProps & InjectedFormProps<{}, IProjectFormProps>
> = ({ handleSubmit, onClose }) => (
  <React.Fragment>
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          component={TextField}
          icon={<ProjectIco />}
          label="Название проекта"
          validate={[required({ msg: 'Обязательное поле' })]}
        />
        <Field
          name="monthlyBudget"
          component={TextField}
          icon={<MoneyIco />}
          label="Месячный бюджет"
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
