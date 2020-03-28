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
  userAvatar?: string;
  userEmail: string;
  userRole: ROLE;
}

export const Profile: React.FC<IProfile> = ({ userAvatar, userEmail, userRole }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <Avatar avatar={userAvatar} email={userEmail} />
          </Grid>
          <Grid item xs={12} md={8} lg={9} xl={10}>
            <Paper>
              <List>
                <ListItem button>
                  <ListItemAvatar>
                    <MuiAvatar alt={userEmail} src={userAvatar} />
                  </ListItemAvatar>
                  <ListItemText primary={userEmail} />
                </ListItem>
                <ProfileForm />
                <ListItem button>
                  <ListItemText inset primary={userRole} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
