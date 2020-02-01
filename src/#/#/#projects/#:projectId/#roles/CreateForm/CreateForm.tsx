import React from 'react';
import Select from 'react-select';

import { TaskType } from '#/@store/task-types';
import { IUserRole } from '@types';

export class ICreateFormProps {
  addItem: any;
  postTaskTypeToProject: any;
  title?: string;
  items: IUserRole[];
}

export class ITaskTypesFormState {
  value?: string;
}

const customStyles = {
  menu: (base: any, state: any) => ({
    ...base,
    // position: 'relative',
  }),
};

export class CreateFormJsx extends React.Component<ICreateFormProps, ITaskTypesFormState> {
  state = {
    value: undefined,
  };

  render() {
    const { items } = this.props;
    const getOptionValue = (option: TaskType) => option.id.toString();
    const getOptionLabel = (option: TaskType) => option.title;
    const options = this.state.value ? [...items, { id: 0, title: `Создать: ${this.state.value}` }] : items;
    return (
      <Select
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        onInputChange={this.handleInputChange}
        options={options as any}
        classNamePrefix="react-select"
        placeholder="Добавить роль..."
        styles={customStyles}
        onChange={this.handleChange as any}
      />
    );
  }

  private handleInputChange = (value: string) => {
    this.setState({ value });
  };

  private handleChange = (selectedTaskType: TaskType) => {
    if (selectedTaskType.id) {
      this.props.addItem(selectedTaskType.id);
    } else {
      this.props.postTaskTypeToProject(this.state.value);
    }
  };
}
