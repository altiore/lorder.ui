import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as cn from 'classnames';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';

export interface IPageProps {
  className?: string;
  classes?: any;
  children?: any;
  height: number;
}

export const PageJsx: React.FunctionComponent<IPageProps> = ({ className, classes, children, height }) => (
  <Grid container className={cn(classes.root, className)}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Scrollbars autoHide autoHeightMin={0} autoHeightMax={height - 70} style={{ height: height - 70 }}>
          {children}
        </Scrollbars>
      </Paper>
    </Grid>
  </Grid>
);
