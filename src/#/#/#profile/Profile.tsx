import React, { useCallback, useState } from 'react';

import MuiAvatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import { Project } from '#/@store/projects';

import Avatar from './Avatar';
import ProfileForm from './ProfileForm';
import { useStyles } from './styles';

import { ROLE } from '@types';

interface IProfile {
  projects: Project[];
  userAvatar?: string;
  userDisplayName: string;
  userRole: ROLE;
}

export const Profile: React.FC<IProfile> = ({ projects, userAvatar, userDisplayName, userRole }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(o => !o);
  }, [setOpen]);

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
                <ListItem button onClick={handleClick}>
                  <ListItemText primary={`Активных проектов - ${projects.length}`} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {projects.map(project => (
                      <ListItem key={project.id} button className={classes.nested}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText
                          primary={project.title}
                          secondary={`${project.shareValue}sp (${project.shareTime})`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                <ProfileForm />
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
