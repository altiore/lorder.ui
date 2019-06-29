import Grid from '@material-ui/core/Grid';
import cn from 'classnames';
import React from 'react';

export interface IPageCenterProps {
  className?: string;
  classes?: any;
  children?: any;
}

export const PageCenterJsx: React.FunctionComponent<IPageCenterProps> = React.memo(
  ({ className, classes, children }) => (
    <div className={cn(classes.content, className)}>
      <Grid container spacing={10}>
        {children}
      </Grid>
    </div>
  )
);
