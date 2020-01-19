import React from 'react';
import Select from 'react-select';

import { TaskType } from '@store/task-types';

export class ITaskTypesFormProps {
  addTaskType: any;
  postTaskTypeToProject: any;
  title?: string;
  filteredTaskTypes: TaskType[];
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

export class TaskTypesFormJsx extends React.Component<ITaskTypesFormProps, ITaskTypesFormState> {
  state = {
    value: undefined,
  };

  render() {
    const { filteredTaskTypes } = this.props;
    const getOptionValue = (option: TaskType) => option.id.toString();
    const getOptionLabel = (option: TaskType) => option.title;
    const options = this.state.value
      ? [...filteredTaskTypes, { id: 0, title: `Создать: ${this.state.value}` }]
      : filteredTaskTypes;
    return (
      <Select
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        onInputChange={this.handleInputChange}
        options={options as any}
        classNamePrefix="react-select"
        placeholder="Добавить тип задачи..."
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
      this.props.addTaskType(selectedTaskType.id);
    } else {
      this.props.postTaskTypeToProject(this.state.value);
    }
  };
}
