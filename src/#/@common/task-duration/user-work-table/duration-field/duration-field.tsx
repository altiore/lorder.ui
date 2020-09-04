import React from 'react';
import Popover from 'react-popover';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';

export interface IDurationFieldProps {
  classes: any;
  updateDuration: (duration: number) => any;
  value: string;
}

export interface IState {
  isEdit: boolean;
  value: string;
}

export class DurationFieldTsx extends React.Component<IDurationFieldProps, IState> {
  state = {
    isEdit: false,
    value: '0:00',
  };

  private input: HTMLInputElement;

  componentDidMount() {
    this.setState({ value: this.prepareValue(this.props.value) });
  }

  render() {
    const { classes, value } = this.props;
    return (
      <Popover
        place="below"
        className={classes.popover}
        isOpen={this.state.isEdit}
        onOuterAction={this.valueOnClick}
        body={
          <div className={classes.inputWrapper}>
            <input
              ref={this.inputRef}
              onKeyDown={this.onKeyPress}
              className={classes.input}
              value={this.state.value}
              onChange={this.valueOnChange}
            />
            <IconButton onClick={this.applyNewDuration} color={'primary'}>
              <CheckIcon fontSize={'small'} />
            </IconButton>
          </div>
        }
      >
        <Button onClick={this.valueOnClick}>{value}</Button>
      </Popover>
    );
  }

  private inputRef = (node: HTMLInputElement) => {
    this.input = node;
  };

  private prepareValue(value: string) {
    let res = '';
    const valArr = value.split(':');
    if (valArr[0] === '00') {
      res = '0';
    } else {
      res = valArr[0].replace('0', '');
    }
    res = res + ':' + valArr[1];
    return res;
  }

  private valueOnClick = () => {
    this.setState(
      ({ isEdit }) => ({ isEdit: !isEdit }),
      () => this.input.focus()
    );
  };

  private onKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      this.applyNewDuration();
    }
  };

  private applyNewDuration = () => {
    this.props.updateDuration(this.convertStringToDuration(this.state.value));
    this.setState({ isEdit: false });
  };

  private convertStringToDuration(value: string): number {
    const varArr = value.split(':');
    return parseInt(varArr[0], 10) * 3600 + parseInt(varArr[1], 10) * 60;
  }

  private valueOnChange = (
    event: React.ChangeEvent<{ value: string; selectionStart: number | null; selectionEnd: number | null }>
  ) => {
    let value = event.target.value;
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    if (selectionStart === selectionEnd) {
      if (selectionStart && value.length - selectionStart < 2) {
        const valArr = value.split(':');
        if (valArr[1]) {
          if (valArr[1].length === 3) {
            value = valArr[1].substr(0, 1) + ':' + valArr[1].substr(1);
            if (valArr[0] !== '0') {
              value = valArr[0] + value;
            }
          }
          if (valArr[1].length === 1) {
            if (valArr[0] === '0') {
              value = '0:0' + valArr[1];
            } else {
              value = (valArr[0].substr(0, valArr[0].length - 1) || '0') + ':' + valArr[0].substr(-1) + valArr[1];
            }
          }
        }
      }
    }
    this.setState({ value });
  };
}
