import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { FaMoneyBill as FaMoney, FaPaperPlane as FaPaper } from 'react-icons/fa';

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
