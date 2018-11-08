import Grid from '@material-ui/core/Grid/Grid';
import * as React from 'react';

export interface IBlockProps {
  children: React.ReactNode;
  classes?: any;
}

export const BlockTsx: React.StatelessComponent<IBlockProps> = ({ children, classes }) => (
  <Grid item xs={12}>
    <Grid container className={classes.root} justify="center" spacing={16}>
      {children}
    </Grid>
  </Grid>
);
