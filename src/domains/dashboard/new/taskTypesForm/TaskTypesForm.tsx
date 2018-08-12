import * as React from 'react';
import Select from 'react-select';
import { FieldArray, InjectedFormProps } from 'redux-form';
import { required } from 'redux-form-validators';

export interface ITaskTypesFormProps {
  goToNext: any,
  title?: string,
  buttonText?: string,
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const customStyles = {
  menu: (base: any, state: any) => ({
    ...base,
    position: 'relative',
  }),
};

export const TaskTypesFormJsx: React.StatelessComponent<ITaskTypesFormProps & InjectedFormProps<{}, ITaskTypesFormProps>> = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} style={{zIndex: 1000}}>
    <FieldArray
      name='taskTypes'
      component={Select}
      options={options}
      classNamePrefix='react-select'
      styles={customStyles}
      validate={[required({ msg: 'Обязательное поле' })]}
    />
  </form>
);
