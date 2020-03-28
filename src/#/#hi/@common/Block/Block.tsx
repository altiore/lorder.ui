import React from 'react';

import cn from 'classnames';

import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';

interface BlockI {
  children: any;
  className?: string;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  grow?: boolean;
  [x: string]: any;
}

const Block: React.FC<BlockI> = ({ children, className, direction = 'row', grow, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid item className={cn(classes.content, className)}>
      <Grid container className={cn({ [classes.container]: grow })} direction={direction} {...rest}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Block;
