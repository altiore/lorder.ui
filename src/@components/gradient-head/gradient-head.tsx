import React from 'react';

import Grid from '@material-ui/core/Grid';

import { useStyles } from './styles';

interface IProps {
  children: React.ReactNode;
}

export const GradientHeadTsx: React.FC<IProps> = ({ children }) => {
  const { contentWrap, projectHeadWrap } = useStyles();
  return (
    <Grid container className={projectHeadWrap} alignItems="center" justify="center">
      <Grid container justify="space-between" className={contentWrap}>
        {children}
      </Grid>
    </Grid>
  );
};
