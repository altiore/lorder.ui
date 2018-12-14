import * as React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { MoneyIco } from 'src/components/@icons/Money';
import { Project2Ico } from 'src/components/@icons/Project2';

import { Input } from 'liw-components/Input';

export interface IProjectFormProps {
  goToNext: any;
  title?: string;
  buttonText?: string;
}

export const ProjectForm: React.FunctionComponent<IProjectFormProps & InjectedFormProps<{}, IProjectFormProps>> = ({
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="title"
      component={Input}
      icon={<Project2Ico />}
      label="Название проекта"
      validate={[required({ msg: 'Обязательное поле' })]}
    />
    <Field
      name="monthlyBudget"
      component={Input}
      icon={<MoneyIco />}
      label="Месячный бюджет"
      validate={[required({ msg: 'Обязательное поле' })]}
    />
  </form>
);
