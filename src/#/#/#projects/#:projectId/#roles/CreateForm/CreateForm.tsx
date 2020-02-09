import React from 'react';
import Select from 'react-select';

import { IUserRole } from '@types';

export class ICreateFormProps {
  addItem: any;
  title?: string;
  items: IUserRole[];
}

export class ICreateFormState {
  value?: string;
}

const customStyles = {
  menu: (base: any, state: any) => ({
    ...base,
    // position: 'relative',
  }),
};

export class CreateFormJsx extends React.Component<ICreateFormProps, ICreateFormState> {
  state = {
    value: undefined,
  };

  render() {
    const { items } = this.props;
    const getOptionValue = (option: IUserRole) => option.id.toString();
    const getOptionLabel = (option: IUserRole) => option.name;
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

  private handleChange = (selectedItem: IUserRole) => {
    if (selectedItem.id) {
      this.props.addItem(selectedItem.id);
    }
  };
}
