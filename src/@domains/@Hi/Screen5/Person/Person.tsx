import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import React from 'react';

import { useStyles } from './styles';

interface PersonI {
  avatar: string;
  name: string;
}

export const Person: React.FC<PersonI> = ({ avatar, name }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.item}>
      <div className={classes.avatarWrapper}>
        <Avatar
          alt={name}
          srcSet={avatar}
          className={classes.avatar}
        />
      </div>
      <Typography align="center" color="textPrimary" variant="h5">
        {name}
      </Typography>
    </Grid>
  );
};
