import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface IProjectsProps {
  classes: any;
}

export const New = ({ classes }: RouteComponentProps<{}> & IProjectsProps) => (
  <Grid container spacing={24}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <form>
          <Button variant='contained' color='primary'>
            <Typography variant='caption' noWrap>{'Создать проект'}</Typography>
          </Button>
        </form>
      </Paper>
    </Grid>
  </Grid>
);
