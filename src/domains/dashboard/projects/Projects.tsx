import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

const src = 'https://cache.harvestapp.com/assets/onboarding/landing-projects@2x-e00081706c6ce0b93cf18c21c6e488f1fc913045992fc34dd18e5e290bc971cb.png';

export interface IProjectsProps {
  classes: any;
}

export const Projects = ({ classes, match }: RouteComponentProps<{}> & IProjectsProps) => (
  <Grid container spacing={24}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <img src={src} />
        </Grid>
        <Link to={`${match.path}/new`}>
          <Button size='large' variant='contained' color='primary'>
            <Typography variant='caption' noWrap>{'Создать проект'}</Typography>
          </Button>
        </Link>
      </Paper>
    </Grid>
  </Grid>
);
