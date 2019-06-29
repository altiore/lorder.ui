import Grid from '@material-ui/core/Grid/Grid';
import React from 'react';

export interface IBlockProps {
  children: React.ReactNode;
  classes?: any;
}

export const BlockTsx: React.FunctionComponent<IBlockProps> = ({ children, classes }) => (
  <Grid item xs={12}>
    <Grid container className={classes.root} justify="center" spacing={10}>
      {children}
    </Grid>
  </Grid>
);
