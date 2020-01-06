import React from 'react';

import { WrappedFieldProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface IStatusField extends WrappedFieldProps {
  changeStatusToggle?: any;
  statuses: string[];
}

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    paddingRight: 26,
    minWidth: theme.spacing(16),
  },
}));

export const StatusField: React.FC<IStatusField> = ({ changeStatusToggle, statuses, input }) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="outlined" aria-label="status button" onClick={changeStatusToggle}>
      {statuses[input.value] || '...???...'}
    </Button>
  );
};
