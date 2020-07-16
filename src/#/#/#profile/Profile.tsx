import React, { useCallback, useState } from 'react';

import Collapse from '@material-ui/core/Collapse';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import TelegramIco from '@components/@icons/Telegram';
import ButtonEdit from '@components/ButtonEdit';
import GradientHead from '@components/gradient-head';

import { Project } from '#/@store/projects';

import Avatar from './Avatar';
import GitHubIco from './icons/github';
import LinkedInIco from './icons/linkedin';
import ProfileForm from './ProfileForm';

import { ROLE } from '@types';

export const useStyles = makeStyles((theme: Theme) => ({
  avatarGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 120,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 8,
    },
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  contactIcon: {
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: theme.shadows[3],
    },
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  iconColored: {
    color: theme.palette.secondary.main,
  },
  lastBlock: {
    borderLeft: `2px solid ${theme.palette.pause.main}`,
    display: 'flex',
    height: 120,
    minWidth: 20,
    paddingLeft: 40,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  profileForm: {
    position: 'relative',
  },
  userNameStyle: {
    color: 'white',
    paddingLeft: theme.spacing(1),
  },
  userRoleStyle: {
    color: theme.palette.pause.main,
    margin: '8px 0 16px',
    paddingLeft: theme.spacing(1),
  },
}));

interface IProfile {
  projects: Project[];
  userAvatar?: string;
  userDisplayName: string;
  userRole: ROLE;
}

export const Profile: React.FC<IProfile> = ({ projects, userAvatar, userDisplayName, userRole }) => {
  const {
    avatarGrid,
    closeIcon,
    contactIcon,
    iconColored,
    lastBlock,
    nested,
    profileForm,
    userNameStyle,
    userRoleStyle,
  } = useStyles();

  const [open, setOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsEdit(isE => !isE);
  }, [setIsEdit]);

  const handleClick = useCallback(() => {
    setOpen(o => !o);
  }, [setOpen]);

  const handleConnect = useCallback(() => {
    alert('Not Implemented (');
  }, []);

  return (
    <div>
      <GradientHead>
        <Grid item xs={12} md={4} className={avatarGrid}>
          <Avatar avatar={userAvatar} email={userDisplayName} />
        </Grid>
        <Grid item xs={12} md={4}>
          {isEdit ? (
            <Paper className={profileForm}>
              <IconButton onClick={toggleEdit} className={closeIcon}>
                <CloseIcon fontSize="small" />
              </IconButton>
              <ProfileForm />
            </Paper>
          ) : (
            <>
              <Typography variant="h3" className={userNameStyle}>
                {userDisplayName}
              </Typography>
              <Typography className={userRoleStyle}>{userRole}</Typography>
              <ButtonEdit onClick={toggleEdit}>Редактировать</ButtonEdit>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4} alignItems="center" className={lastBlock}>
          <Fab className={contactIcon} onClick={handleConnect}>
            <TelegramIco />
          </Fab>
          <Fab className={contactIcon} onClick={handleConnect}>
            <GitHubIco color="inherit" className={iconColored} />
          </Fab>
          <Fab className={contactIcon} onClick={handleConnect}>
            <LinkedInIco color="inherit" className={iconColored} />
          </Fab>
        </Grid>
      </GradientHead>
      <div>
        <List>
          <ListItem button onClick={handleClick}>
            <ListItemText primary={`Активных проектов - ${projects.length}`} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {projects.map(project => (
                <ListItem key={project.id} button className={nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={project.title} secondary={`${project.shareValue}sp (${project.shareTime})`} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
};
