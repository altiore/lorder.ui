import Grid from '@material-ui/core/Grid';
import cn from 'classnames';
import React from 'react';

import { useStyles } from './styles';

interface BlockContentI {
  black?: boolean;
  children: any;
  className?: string;
}

export const BlockContent: React.FC<BlockContentI> = ({ children, className, black }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item md={1} xs={false} />
      <Grid item md={10} xs={12} className={cn(classes.content, { [classes.contentBlack]: black }, className)}>
        {children}
      </Grid>
      <Grid item md={1} xs={false} />
    </>
  );
};
