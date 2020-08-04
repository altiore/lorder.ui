import React from 'react';

import { WrappedFieldProps } from 'redux-form';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { STATUS_NAMES } from '#/@store/tasks';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: theme.spacing(16),
    paddingRight: 26,
  },
}));

export const StatusField: React.FC<WrappedFieldProps> = ({ input }) => {
  const { button } = useStyles();
  return (
    <Button className={button} variant="outlined" aria-label="status button">
      {STATUS_NAMES[input.value] || input.value}
    </Button>
  );
};
