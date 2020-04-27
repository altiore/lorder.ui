import React from 'react';

import MuiAvatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import Avatar from './Avatar';
import ProfileForm from './ProfileForm';
import { useStyles } from './styles';

import { ROLE } from '@types';

interface IProfile {
  projects?: any[];
  userAvatar?: string;
  userDisplayName: string;
  userRole: ROLE;
}

export const Profile: React.FC<IProfile> = ({ projects, userAvatar, userDisplayName, userRole }) => {
  const classes = useStyles();

  console.log('render Profile', { projects });
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <Avatar avatar={userAvatar} email={userDisplayName} />
          </Grid>
          <Grid item xs={12} md={8} lg={9} xl={10}>
            <Paper>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <MuiAvatar alt={userDisplayName} src={userAvatar} />
                  </ListItemAvatar>
                  <ListItemText primary={userDisplayName} secondary={userRole} />
                </ListItem>
                <ProfileForm />
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
