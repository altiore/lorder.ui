import React from 'react';

import { WrappedFieldProps } from 'redux-form';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    time: {
      width: theme.spacing(62),
      zIndex: 4000,
    },
  })
);

interface ITimeFieldProps {
  label: string;
}

export const TimeFieldTsx: React.FC<WrappedFieldProps & ITimeFieldProps> = ({ input, label }) => {
  const classes = useStyles();

  return (
    <TextField
      label={label}
      type="datetime-local"
      className={classes.time}
      disabled={!input.value}
      {...input}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
