import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';

export interface IPageProps {
  classes?: any;
  children?: any;
}

export const PageJsx: React.StatelessComponent<IPageProps> = ({ classes, children }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>{children}</Paper>
    </Grid>
  </Grid>
);
