import React from 'react';

import { WrappedFieldProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { STATUS_NAMES } from '#/@store/tasks';

interface IStatusField extends WrappedFieldProps {
  statusToName: { [key in number]: string };
}

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: theme.spacing(16),
    paddingRight: 26,
  },
}));

export const StatusField: React.FC<IStatusField> = ({ statusToName, input }) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="outlined" aria-label="status button">
      {STATUS_NAMES[statusToName[input.value]] || '...???...'}
    </Button>
  );
};
