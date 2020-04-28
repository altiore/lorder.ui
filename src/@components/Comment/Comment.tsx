import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

import { IUser, TASK_CHANGE_TYPE } from '../../@types';

export interface IComment {
  changeType: TASK_CHANGE_TYPE;
  createdAt: any;
  description?: string;
  id: number;
  user: IUser;
}

const useStyles = makeStyles((theme: Theme) => ({
  comment: {
    color: 'rgb(23, 43, 77)',
  },
  name: {
    fontWeight: 600,
  },
  root: {
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  title: {
    fontSize: 14,
  },
}));

const DATE_FORMAT = 'DD-MM-YYYY, hh:mm';

export const Comment: React.FC<IComment> = ({ changeType, createdAt, description, id, user }) => {
  const classes = useStyles();

  if (!user) {
    return null;
  }

  return (
    <div key={id} className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        <span className={classes.name}>{user.email}</span>
        &nbsp;
        <span>{moment.utc(createdAt).format(DATE_FORMAT)}</span>
        &nbsp;
      </Typography>
      <Typography className={classes.comment}>
        {changeType}
        {description ? ` - (${description})` : ''}
      </Typography>
    </div>
  );
};
