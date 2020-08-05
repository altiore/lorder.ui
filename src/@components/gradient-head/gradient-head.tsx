import React from 'react';

import cn from 'classnames';

import Grid, { GridProps } from '@material-ui/core/Grid';

import { useStyles } from './styles';

interface IProps extends GridProps {
  children: React.ReactNode;
}

export const GradientHeadTsx: React.FC<IProps> = ({ children, className, ...rest }) => {
  const { contentWrap, projectHeadWrap } = useStyles();
  return (
    <Grid container className={cn(projectHeadWrap, className)} alignItems="center" justify="center" {...rest}>
      <Grid container justify="space-between" className={contentWrap}>
        {children}
      </Grid>
    </Grid>
  );
};
