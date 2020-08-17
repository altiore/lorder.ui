import React, { useCallback, useState } from 'react';

import cn from 'classnames';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import T from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import TelegramIco from '@components/@icons/Telegram';
import ButtonEdit from '@components/button-edit';
import GradientHead from '@components/gradient-head';
import ProjectCard, { CARD_COLOR, LOGO_TYPE } from '@components/project-card';

import { LinkButton } from '#/@common/link-button';
import { Project, VALUE_MULTIPLIER } from '#/@store/projects';
import { ROUTE } from '#/@store/router';

import Avatar from './avatar';
import GitHubIco from './icons/github';
import LinkedInIco from './icons/linkedin';
import ProfileForm from './profile-form';

import { IPublicProject } from '@types';
import getRandEnum from '@utils/get-rand-enum';

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
  emptyProjects: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  emptyProjectsTitle: {
    marginBottom: 32,
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
  profileForm: {
    position: 'relative',
  },
  projectList: {
    margin: '0 auto',
    maxWidth: 1290,
    padding: '60px 0',
  },
  scrollBody: {
    backgroundColor: 'white',
    height: 'calc(100vh - 56px)',
    overflowY: 'auto',
    ...theme.scroll.secondary,
  },
  userEmailStyle: {
    color: theme.palette.pause.main,
    margin: '8px 0 16px',
    paddingLeft: theme.spacing(1),
  },
  userNameStyle: {
    color: 'white',
    paddingLeft: theme.spacing(1),
  },
  userNameStyleEmpty: {
    color: theme.palette.pause.main,
  },
}));

interface IProfile {
  projects: Project[];
  userAvatar?: string;
  userDisplayName: string;
  userEmail: string;
}

export const Profile: React.FC<IProfile> = ({ projects, userAvatar, userDisplayName, userEmail }) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = useCallback(() => {
    setIsEdit(isE => !isE);
  }, [setIsEdit]);

  const handleConnect = useCallback(() => {
    alert('Not Implemented (');
  }, []);

  const getProjectLink = useCallback((id?: number, pub?: IPublicProject) => {
    if (pub && pub.uuid) {
      return ROUTE.PUBLIC.ONE(pub.uuid);
    } else {
      if (id) {
        return `/projects/${id}`;
      }
    }

    return '/';
  }, []);

  const {
    avatarGrid,
    closeIcon,
    contactIcon,
    emptyProjects,
    emptyProjectsTitle,
    iconColored,
    lastBlock,
    profileForm,
    projectList,
    scrollBody,
    userEmailStyle,
    userNameStyle,
    userNameStyleEmpty,
  } = useStyles();
  return (
    <div className={scrollBody}>
      <GradientHead>
        <Grid item xs={12} md={4} className={avatarGrid}>
          <Avatar fileAlt={userDisplayName} fileUrl={userAvatar} isEditable />
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
              <T variant="h3" className={cn(userNameStyle, { [userNameStyleEmpty]: !userDisplayName })}>
                {userDisplayName || '[НЕТ ПУБЛИЧНОГО ИМЕНИ]'}
              </T>
              <T className={userEmailStyle}>{userEmail}</T>
              <ButtonEdit onClick={toggleEdit}>Редактировать</ButtonEdit>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4} className={lastBlock}>
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
      <div className={projectList}>
        <Grid alignItems="center" justify="center" container spacing={3}>
          {Boolean(projects && projects.length) ? (
            projects.map(({ id, logo, members, pub, shareValue, roles, title }) => (
              <Grid key={id} item>
                <ProjectCard
                  logoSrc={logo?.url}
                  color={getRandEnum(CARD_COLOR)}
                  logoVariant={getRandEnum(LOGO_TYPE)}
                  title={title}
                  membersCount={members.length}
                  projectLink={getProjectLink(id, pub)}
                  userInfo={{
                    displayName: userDisplayName,
                    logoSrc: userAvatar,
                    mainRole: roles?.[0]?.role?.name || 'Участник',
                    // message?: string;
                    shortName: userDisplayName ? userDisplayName.slice(0, 2) : '--',
                    value: shareValue * VALUE_MULTIPLIER,
                  }}
                  value={pub?.statistic?.metrics?.all?.value * VALUE_MULTIPLIER}
                />
              </Grid>
            ))
          ) : (
            <div className={emptyProjects}>
              <T className={emptyProjectsTitle} variant="h2">
                Здесь появятся интересные тебе проекты
              </T>
              <LinkButton to="/projects/list" color="primary" variant="contained" size="large">
                Перейти к обзору и поиску проектов
              </LinkButton>
            </div>
          )}
        </Grid>
      </div>
    </div>
  );
};
