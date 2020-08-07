import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  time: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 3,
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    zIndex: 4000,
  },
}));

export const TimeFieldTsx: React.FC<WrappedFieldProps & WrappedFieldMetaProps> = ({
  input,
  meta: { touched, error },
}) => {
  const classes = useStyles();
  return (
    <>
      <DatePicker
        {...input}
        className={classes.time}
        selected={input.value}
        showTimeSelect
        timeIntervals={5}
        timeCaption="time"
        dateFormat="MM/dd/yyyy HH:mm"
      />
      {touched && error && <span>{error}</span>}
    </>
  );
};
