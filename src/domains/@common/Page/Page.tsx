import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';

export interface IPageProps {
  classes?: any;
  children?: any;
}

export const PageJsx: React.StatelessComponent<IPageProps> = ({ classes, children }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Scrollbars autoHide autoHeightMin={0} autoHeightMax={800} style={{ height: 800 }}>
          {children}
        </Scrollbars>
      </Paper>
    </Grid>
  </Grid>
);
