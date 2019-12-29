import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export interface IBlockProps {
  children: React.ReactNode;
  spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const useStyles = makeStyles(theme => ({
  root: {
    padding: 40,
    width: '100%',
  },
}));

export const BlockTsx: React.FC<IBlockProps> = ({ children, spacing }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Grid container className={classes.root} justify="center" spacing={spacing}>
        {children}
      </Grid>
    </Grid>
  );
};
