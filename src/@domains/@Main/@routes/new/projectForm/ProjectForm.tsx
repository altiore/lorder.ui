import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

import { MoneyIco } from '@components/@icons/Money';
import { Project2Ico } from '@components/@icons/Project2';

import { TextField } from '@components/TextField';

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
      component={TextField}
      icon={<Project2Ico />}
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
);
