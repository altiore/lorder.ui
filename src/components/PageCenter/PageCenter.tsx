import Grid from '@material-ui/core/Grid';
import * as cn from 'classnames';
import * as React from 'react';

export interface IPageCenterProps {
  className?: string;
  classes?: any;
  children?: any;
}

export const PageCenterJsx: React.StatelessComponent<IPageCenterProps> = ({ className, classes, children }) => (
  <div className={cn(classes.content, className)}>
    <Grid container spacing={16}>
      {children}
    </Grid>
  </div>
);
