import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { LinkButton } from 'src/domains/@common/LinkButton';

export interface ITitleProps {
  classes: any;
}

export const TitleTsx: React.FunctionComponent<ITitleProps> = ({ classes }) => (
  <Grid container className={classes.wrapper}>
    <Grid item className={classes.root2} xs={12} />
    <Grid item className={classes.root}>
      <Typography variant="h1" color="secondary" className={classes.title}>
        Время беспощадно...
      </Typography>

      <LinkButton color="primary" variant="contained" size="large" className={classes.button} to={'/login'}>
        Обмануть время!
      </LinkButton>
    </Grid>
    <Grid item className={classes.root2} xs={12} />
    <Grid item className={classes.root2} xs={12} />
  </Grid>
);
