import React from 'react';
import { Element } from 'react-scroll';

import cn from 'classnames';

import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';

interface BlockI {
  name: string;
  children: any;
  className?: string;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  grow?: boolean;
  [x: string]: any;
}

const Block: React.FC<BlockI> = ({ children, className, direction = 'row', grow, name, ...rest }) => {
  const classes = useStyles();

  return (
    <Element name={name} className={classes.element}>
      <Grid item className={cn(classes.content, className)}>
        <Grid container className={cn({ [classes.container]: grow })} direction={direction} {...rest}>
          {children}
        </Grid>
      </Grid>
    </Element>
  );
};

export default Block;
