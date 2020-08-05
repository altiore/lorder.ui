import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import manImg from './d-avatar.png';

const IMAGE_SIZE = 180;

export const useStyles = makeStyles((theme: Theme) => ({
  avatarStyle: {
    height: IMAGE_SIZE,
    margin: theme.spacing(1 / 2),
    width: IMAGE_SIZE,
  },
  avatarWrapper: {
    alignItems: 'center',
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: '50%',
    display: 'flex',
    heigth: theme.spacing(23.5),
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    width: theme.spacing(23.5),
  },
  item: {
    marginBottom: theme.spacing(2),
    maxWidth: theme.spacing(27.5),
  },
}));

interface PersonI {
  avatar?: string;
  name?: string;
}

export const Person: React.FC<PersonI> = ({ avatar, name }) => {
  const { avatarStyle, avatarWrapper, item } = useStyles();

  return (
    <Grid item className={item}>
      <ButtonBase className={avatarWrapper}>
        <Avatar alt={name || 'N/A'} src={avatar || manImg} className={avatarStyle} />
      </ButtonBase>
      <Typography noWrap align="center" color="textPrimary" variant="h4">
        {name || 'N/A'}
      </Typography>
    </Grid>
  );
};
