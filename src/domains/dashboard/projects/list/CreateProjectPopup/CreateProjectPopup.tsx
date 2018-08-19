import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Input } from 'liw-components/Input';
import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

const FaMoney = require('react-icons/lib/fa/money');
const FaPaper = require('react-icons/lib/fa/paper-plane-o');

export interface IProjectFormProps {
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
          component={Input}
          icon={<FaPaper />}
          label="Название проекта"
          validate={[required({ msg: 'Обязательное поле' })]}
        />
        <Field
          name="monthlyBudget"
          component={Input}
          icon={<FaMoney />}
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
