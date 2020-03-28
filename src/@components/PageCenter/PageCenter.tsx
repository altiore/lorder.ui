import React from 'react';

import cn from 'classnames';

import Grid from '@material-ui/core/Grid';

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
