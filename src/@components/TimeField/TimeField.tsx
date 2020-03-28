import React from 'react';

import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import { WrappedFieldProps } from 'redux-form';
const TimePicker = require('rc-time-picker').DoneG;

export interface ITimeFieldProps extends WrappedFieldProps {
  classes: any;
}

export const TimeFieldTsx: React.FunctionComponent<ITimeFieldProps> = ({ classes, input, meta }) => {
  return (
    <TimePicker
      name={input.name}
      value={input.value || moment()}
      popupClassName={classes.time}
      onChange={input.onChange}
      disabled={!input.value}
    />
  );
};
