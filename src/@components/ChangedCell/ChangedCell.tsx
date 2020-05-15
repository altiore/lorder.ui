import React from 'react';
import Popover from 'react-popover';

import { WrappedFieldProps } from 'redux-form';

import Button from '@material-ui/core/Button';

// import { ListBox } from 'liw-components/ListBox';

interface IChangedCellState {
  isOpen: boolean;
}

export interface IChangedCellProps extends WrappedFieldProps {
  classes: any;
  changeValue: any;
  items: any[];
  title: string;
}

export class ChangedCellTsx extends React.Component<IChangedCellProps, IChangedCellState> {
  state = {
    isOpen: false,
  };

  render() {
    const { input } = this.props;
    const { isOpen } = this.state;

    return (
      <Popover
        preferPlace="below"
        isOpen={isOpen}
        onOuterAction={this.handleOnClick}
        style={{ zIndex: 3003 }}
        body={<div>testBody</div>}
        // body={
        //   <ListBox
        //     items={items}
        //     showFilter
        //     onClose={this.handleOnClick}
        //     getItemLabel={this.getLabel}
        //     getItemValue={this.getValue}
        //     filterItem={this.filterItem}
        //     findItemIndex={this.findItemIndex}
        //     input={{
        //       ...input,
        //       onChange: this.handleChange,
        //     }}
        //     label={title}
        //     {...rest}
        //   />
        // }
      >
        <Button onClick={this.handleOnClick}>{input.value || 'NOT SET'}</Button>
      </Popover>
    );
  }

  private handleOnClick = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  private handleChange = (changedValue: any) => {
    this.props.changeValue(changedValue);
    this.handleOnClick();
  };

  private filterItem(filterKw: string, item: any) {
    return item.label.toLowerCase().indexOf(filterKw.toLowerCase()) === 0;
  }

  private findItemIndex(item: any, value: any) {
    return value.findIndex((el: any) => el === item.value);
  }

  private getLabel = (value: any) => value.label;
  private getValue = (value: any) => value.value;
}
