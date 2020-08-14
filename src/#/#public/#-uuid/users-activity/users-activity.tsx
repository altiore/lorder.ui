import React from 'react';

import { Container, Grid } from '@material-ui/core';

import FollowProject from '../follow-project';
import { useStyles } from './style';
import UsersBoard from './users-board';

export const UsersActivity = (p: any) => {
  const classes = useStyles();
  return (
    <section className={classes.usersActivityWrap}>
      <Container>
        <Grid container className={classes.componentsWrap}>
          <UsersBoard />
          <FollowProject project={p.project} verticalDirection={true} />
        </Grid>
      </Container>
    </section>
  );
};
