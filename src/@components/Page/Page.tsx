import React from 'react';
import Scrollbars from 'react-custom-scrollbars';

import cn from 'classnames';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles';

export interface IPageProps {
  className?: string;
  classes?: any;
  children?: any;
  height: number;
  isWidthSm: boolean;
  theme: Theme;
}

export const PageJsx: React.FunctionComponent<IPageProps> = ({
  className,
  classes,
  children,
  height: pHeight,
  isWidthSm,
  theme,
}) => {
  const height = pHeight - 69.6 - (isWidthSm ? 0 : theme.spacing(14));
  return (
    <Grid container className={cn(classes.root, className)}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Scrollbars autoHide autoHeightMin={0} autoHeightMax={height} style={{ height }}>
            {children}
          </Scrollbars>
        </Paper>
      </Grid>
    </Grid>
  );
};
