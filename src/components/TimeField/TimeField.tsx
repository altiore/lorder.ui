import * as moment from 'moment';
import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import 'rc-time-picker/assets/index.css';
const TimePicker = require('rc-time-picker').default;

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
