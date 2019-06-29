import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useStyles } from './styles';

interface AchievementI {
  title: string;
  value: string | number;
}

export const Achievement: React.FC<AchievementI> = ({ title, value }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.item}>
      <div className={classes.value}>{value}</div>
      <Typography align="center" variant="h5">
        {title}
      </Typography>
    </Grid>
  );
};
