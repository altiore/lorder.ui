import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

const FaMoney = require('react-icons/lib/fa/money');
const FaPaper = require('react-icons/lib/fa/paper-plane-o');

import { Input } from 'liw-components/Input';

export interface IProjectFormProps {
  goToNext: any;
  title?: string;
  buttonText?: string;
}

export const ProjectForm: React.StatelessComponent<IProjectFormProps & InjectedFormProps<{}, IProjectFormProps>> = ({
  handleSubmit,
}) => (
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
);
