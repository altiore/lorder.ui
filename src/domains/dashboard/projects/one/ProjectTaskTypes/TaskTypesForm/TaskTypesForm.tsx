import * as React from 'react';
import Select from 'react-select';

import { TaskType } from 'src/store/task-types';

export interface ITaskTypesFormProps {
  addTaskType: any;
  title?: string;
  buttonText?: string;
  filteredTaskTypes: TaskType[];
}

const customStyles = {
  menu: (base: any, state: any) => ({
    ...base,
    // position: 'relative',
  }),
};

export class TaskTypesFormJsx extends React.Component<ITaskTypesFormProps> {
  public render() {
    const { filteredTaskTypes } = this.props;
    const getOptionValue = (option: TaskType) => option.id.toString();
    const getOptionLabel = (option: TaskType) => option.title;
    return (
      <Select
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        options={filteredTaskTypes}
        classNamePrefix="react-select"
        placeholder="Добавить тип задачи..."
        styles={customStyles}
        onChange={this.handleChange}
      />
    );
  }

  private handleChange = (selectedTaskType: TaskType) => {
    this.props.addTaskType(selectedTaskType.id);
  };
}
