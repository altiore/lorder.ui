import * as moment from 'moment';
import * as React from 'react';
import { InjectedFormProps } from 'redux-form';

import 'rc-time-picker/assets/index.css';
const TimePicker = require('rc-time-picker');

export interface IEditWorkData {
  email: string;
  name: string;
  feedback: string;
}

export interface IEditWorkProps extends InjectedFormProps<IEditWorkData, IEditWorkProps> {
  classes: any;
  onClose: any;
}

export interface IEditWorkState {
  time?: moment.Moment;
}

export class EditWorkTsx extends React.Component<IEditWorkProps, IEditWorkState> {
  state = {
    time: moment(),
  };

  render() {
    const { classes } = this.props;
    const { time } = this.state;

    return (
      <form className={classes.root}>
        <div className={classes.rowSpaceBetween}>
          <div className={classes.col}>
            <span>Начало</span>
            <TimePicker
              name="startAt"
              style={{ width: 100 }}
              showSecond
              value={time}
              className={classes.time}
              minuteStep={5}
              onChange={this.onCustomChange}
              popupStyle={{ zIndex: 4000 }}
            />
          </div>
          <div>55:12</div>
          <div className={classes.col}>
            <span>Конец</span>
            <TimePicker
              name="finishAt"
              style={{ width: 100 }}
              showSecond={false}
              value={time}
              className={classes.time}
              minuteStep={5}
              onChange={this.onCustomChange}
              popupStyle={{ zIndex: 4000 }}
            />
          </div>
        </div>
      </form>
    );
  }

  private onCustomChange = (time: moment.Moment) => {
    this.setState({ time });
  };
}
