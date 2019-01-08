import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select, { SelectProps } from '@material-ui/core/Select';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import uniqueId from 'uniqid';

export interface ISelectFieldProps {
  classes: any;
  children: React.ReactNode;
  fullWidth?: boolean;
  label: React.ReactNode;
  labelWidth?: number;
}

export class SelectMenuFieldTsx extends React.Component<ISelectFieldProps & Partial<SelectProps> & WrappedFieldProps> {
  constructor(props: ISelectFieldProps & Partial<SelectProps> & WrappedFieldProps) {
    super(props);
  }

  render() {
    const {
      classes,
      fullWidth,
      input,
      meta: { touched, error },
      label,
      labelWidth = 42,
      children,
      ...custom
    } = this.props;
    const id = uniqueId('select-menu-field');

    return (
      <FormControl error={touched && error} fullWidth={fullWidth}>
        <InputLabel htmlFor={id} classes={{ formControl: classes.inputLabelFormControl }}>
          {label}
        </InputLabel>
        <Select
          {...input}
          error={touched && error}
          input={<OutlinedInput labelWidth={labelWidth} name={input.name} id={id} />}
          children={children}
          {...custom}
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
}
