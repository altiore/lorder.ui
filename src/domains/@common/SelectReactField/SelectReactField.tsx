import * as React from 'react';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';
import { Key } from 'ts-keycode-enum';

export interface ISelectReactFieldProps extends WrappedFieldProps {
  classes: any;
  getLabel?: (opt: any) => string;
  getValue?: (opt: any) => any;
  options: any[];
  onSelect?: (item: any) => any;
}

export class SelectReactFieldJsx extends React.Component<ISelectReactFieldProps, {}> {
  public static defaultProps = {
    getLabel: (opt: any) => opt && opt.label,
    getValue: (opt: any) => opt && opt.value,
    onSelect: (item: any) => console.log('selected item is', item),
  };

  private select: React.RefObject<any>;

  constructor(props: ISelectReactFieldProps) {
    super(props);
    this.select = React.createRef();
  }

  public render() {
    const { classes, input, getLabel, getValue, label, onSelect, options, ...rest } = this.props;
    return (
      <Select
        ref={this.select as any}
        className={classes.root}
        getOptionLabel={getLabel}
        getOptionValue={getValue}
        onChange={onSelect}
        onInputChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={this.onKeyDownHandler}
        value={input.value}
        placeholder={label}
        options={options}
        {...rest}
      />
    );
  }

  private onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    switch (e.keyCode) {
      case Key.Enter:
        console.log('pressed enter');
        // e.persist();
        // this.select.current.blur();
        break;

      default:
        break;
    }
  };
}
