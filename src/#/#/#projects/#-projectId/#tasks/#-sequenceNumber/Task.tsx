import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { PatchTaskForm } from '#/@common/TaskForm';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexFlow: 'column nowrap',
    height: `calc(100% - ${theme.spacing(2)}px)`,
    margin: theme.spacing(1, 2),
  },
}));

export const TaskTsx: React.FC<RouteComponentProps> = rest => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PatchTaskForm {...rest} />
    </div>
  );
};
