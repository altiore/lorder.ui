import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import manImg from '../MemberCard/d-avatar.png';
import { useStyles } from './styles';

interface PersonI {
  avatar?: string;
  name: string;
}

export const Person: React.FC<PersonI> = ({ avatar, name }) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.item}>
      <ButtonBase className={classes.avatarWrapper}>
        <Avatar alt={name} src={avatar || manImg} className={classes.avatar} />
      </ButtonBase>
      <Typography noWrap align="center" color="textPrimary" variant="h4">
        {name}
      </Typography>
    </Grid>
  );
};
