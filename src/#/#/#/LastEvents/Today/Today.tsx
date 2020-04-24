import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface IToday {
  total: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(0, 1),
  },
}));

export const TodayTsx: React.FC<IToday> = ({ total }): JSX.Element => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <span>Сегодня:&nbsp;</span>
      <Typography variant="h5">{total}</Typography>
    </div>
  );
};
