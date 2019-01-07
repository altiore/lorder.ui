import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select, { SelectProps } from '@material-ui/core/Select';
import get from 'lodash-es/get';
import uniqueId from 'lodash-es/uniqueId';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';

export interface ISelectFieldProps extends WrappedFieldProps {
  children: React.ReactNode;
  label: React.ReactNode;
  fullWidth?: boolean;
}

export class SelectMenuFieldTsx extends React.PureComponent<ISelectFieldProps & SelectProps> {
  InputLabelRef: any;
  constructor(props: ISelectFieldProps & SelectProps) {
    super(props);
  }

  componentDidMount() {
    const node = findDOMNode(this.InputLabelRef);
    if (node) {
      this.setState({
        labelWidth: get(node, 'offsetWidth') as number,
      });
    }
  }

  render() {
    const {
      fullWidth,
      input,
      meta: { touched, error },
      label,
      children,
      ...custom
    } = this.props;
    const id = uniqueId();

    console.log('renderI', input.value);
    return (
      <FormControl error={touched && error} fullWidth={fullWidth}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          {...input}
          error={touched && error}
          input={<OutlinedInput labelWidth={50} name={input.name} id={id} value={input.value} />}
          onChange={this.onChange}
          {...custom}
        >
          <MenuItem value={0}>First</MenuItem>
          <MenuItem value={1}>Second</MenuItem>
          <MenuItem value={2}>Third</MenuItem>
        </Select>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('newValue is', event.target.value);
    this.props.input.onChange(event.target.value);
  };
}
