import * as React from 'react';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

export interface ISelectOptionType {
  label: React.ReactNode;
  value: any;
}

export interface ISelectReactFieldProps extends WrappedFieldProps {
  classes?: any;
  isValidOption?: (opt: ISelectOptionType) => boolean;
  getLabel?: (opt: ISelectOptionType) => string;
  getNewOption?: (inputValue: string) => ISelectOptionType;
  getValue?: (opt: ISelectOptionType) => any;
  label?: string;
  options: any[];
  onSelect: (value: ISelectOptionType) => any;
}

export class SelectReactFieldJsx extends React.PureComponent<ISelectReactFieldProps, {}> {
  static defaultProps = {
    getLabel: (opt: any) => opt && opt.label,
    getNewOption: (inputValue?: string) => ({ label: `Создать: ${inputValue}`, value: inputValue }),
    getValue: (opt: any) => opt && opt.value,
    isValidOption: (opt: any) => opt.label,
    onSelect: (item: any) => console.log('selected item is', item),
  };

  render() {
    const { classes, input, isValidOption, getLabel, getNewOption, getValue, label, options, ...rest } = this.props;
    let preparedOptions;
    if (isValidOption && getNewOption && isValidOption(getNewOption(input.value))) {
      preparedOptions = [getNewOption(input.value), ...options];
    } else {
      preparedOptions = [...options];
    }
    return (
      <Select
        className={classes.root}
        getOptionLabel={getLabel}
        getOptionValue={getValue}
        onInputChange={input.onChange}
        onBlur={input.onBlur}
        onChange={this.handleOnChange}
        value={input.value}
        placeholder={label}
        options={preparedOptions}
        {...rest}
      />
    );
  }

  private handleOnChange = (value: ISelectOptionType) => {
    if (this.props.isValidOption && this.props.isValidOption(value)) {
      this.props.onSelect(value);
    }
  };
}
