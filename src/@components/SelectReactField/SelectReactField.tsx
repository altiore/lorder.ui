import React from 'react';
import Select from 'react-select';
import { WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

export interface ISelectOptionType {
  label: React.ReactNode;
  value: any;
}

export interface ISelectReactFieldProps extends WrappedFieldProps {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
  classes?: any;
  isValidOption?: (opt: ISelectOptionType) => boolean;
  getLabel?: (opt: ISelectOptionType) => string;
  getNewOption?: (inputValue: string) => ISelectOptionType;
  getValue?: (opt: ISelectOptionType) => any;
  label?: string;
  options: any[];
  onSelect: (value: ISelectOptionType) => any;
}

export class SelectReactFieldJsx extends React.Component<ISelectReactFieldProps, {}> {
  static defaultProps = {
    getLabel: (opt: any) => opt && opt.label,
    getNewOption: (inputValue?: string) => ({ label: `Создать: ${inputValue}`, value: inputValue }),
    getValue: (opt: any) => opt && opt.value,
    isValidOption: (opt: any) => opt.label,
    onSelect: (item: any) => '',
  };

  shouldComponentUpdate(
    nextProps: Readonly<ISelectReactFieldProps>,
    nextState: Readonly<{}>,
    nextContext: any
  ): boolean {
    if (
      nextProps.input !== this.props.input ||
      nextProps.meta !== this.props.meta ||
      nextProps.options !== this.props.options ||
      nextProps.label !== this.props.label
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      classes,
      input,
      meta: { error },
      isValidOption,
      getLabel,
      getNewOption,
      getValue,
      label,
      options,
      ...rest
    } = this.props;
    let preparedOptions;
    if (isValidOption && getNewOption && isValidOption(getNewOption(input.value))) {
      preparedOptions = [getNewOption(input.value), ...options];
    } else {
      preparedOptions = [...options];
    }
    return (
      <div className={classes.wrapper}>
        {!!error && <span className={classes.error}>{error}</span>}
        <Select
          className={classes.root}
          getOptionLabel={getLabel}
          getOptionValue={getValue}
          onInputChange={input.onChange}
          onBlur={input.onBlur}
          onChange={this.handleOnChange as any}
          value={input.value}
          placeholder={label}
          options={preparedOptions}
          {...rest}
        />
      </div>
    );
  }

  private handleOnChange = (value: ISelectOptionType) => {
    if (this.props.isValidOption && this.props.isValidOption(value)) {
      this.props.onSelect(value);
    }
  };
}
