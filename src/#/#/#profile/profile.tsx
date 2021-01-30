import React, { useCallback, useState } from 'react';

import cn from 'classnames';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import T from '@material-ui/core/Typography';
import PlusIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import TelegramIco from '@components/@icons/Telegram';
import ButtonEdit from '@components/button-edit';
import GradientHead from '@components/gradient-head';
import ProjectCard from '@components/project-card';
import Slider from '@components/slider';

import { createProjectDialogProps, CreateProjectPopup } from '#/@common/create-project-popup';
import { LinkButton } from '#/@common/link-button';
import { ROUTE } from '#/@store/router';

import Avatar from './avatar';
import GitHubIco from './icons/github';
import LinkedInIco from './icons/linkedin';
import ProfileForm from './profile-form';

import { IProject, IPublicProject, IUserSocial, SOCIAL_FLOW } from '@types';

interface IProfile {
  openDialog: any;
  projects: IProject[];
  userAvatar?: string;
  userDisplayName: string;
  userEmail: string;
  userSocials: IUserSocial[];
}

export const Profile: React.FC<IProfile> = ({
  openDialog,
  projects,
  userAvatar,
  userDisplayName,
  userEmail,
  userSocials,
}) => {
  const [isEdit, setIsEdit] = useState(!userDisplayName);

  const toggleEdit = useCallback(() => {
    setIsEdit(isE => !isE);
  }, [setIsEdit]);

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

  const createProject = useCallback(() => {
    openDialog(CreateProjectPopup, createProjectDialogProps);
  }, [openDialog]);

  const {
    avatarGrid,
    closeIcon,
    contactIcon,
    createBtn,
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
              <T
                variant="h3"
                className={cn(userNameStyle, {
                  [userNameStyleEmpty]: !userDisplayName,
                })}
              >
                {userDisplayName || '[НЕТ ПУБЛИЧНОГО ИМЕНИ]'}
              </T>
              <T className={userEmailStyle}>{userEmail}</T>
              <ButtonEdit onClick={toggleEdit}>Редактировать</ButtonEdit>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4} className={lastBlock}>
          {userSocials
            .filter(el => el.socialLink)
            .map(social => (
              <Fab className={contactIcon} href={social.socialLink} key={social.socialType}>
                {social.socialType === SOCIAL_FLOW.TELEGRAM && social.socialLink ? (
                  <TelegramIco color="inherit" className={iconColored} />
                ) : (
                  <></>
                )}
                {social.socialType === SOCIAL_FLOW.GITHUB && social.socialLink ? (
                  <GitHubIco color="inherit" className={iconColored} />
                ) : (
                  <></>
                )}
                {social.socialType === SOCIAL_FLOW.LINKEDIN && social.socialLink ? (
                  <LinkedInIco color="inherit" className={iconColored} />
                ) : (
                  <></>
                )}
              </Fab>
            ))}
        </Grid>
      </GradientHead>
      <Container id="project-list" className={projectList}>
        {Boolean(projects && projects.length) ? (
          <Slider>
            {projects.map(({ id, logo, members, pub, shareValue, memberRole, title, viewColor, viewType }) => {
              const statisticMembersCount = pub?.statistic?.metrics?.all?.membersCount;
              return (
                <ProjectCard
                  key={id}
                  logoSrc={logo?.url}
                  color={viewColor}
                  logoVariant={viewType}
                  title={title}
                  membersCount={members.length ? members.length : statisticMembersCount || 0}
                  projectLink={getProjectLink(id, pub)}
                  userInfo={{
                    displayName: userDisplayName,
                    logoSrc: userAvatar,
                    mainRole: memberRole,
                    // message?: string;
                    shortName: userDisplayName ? userDisplayName.slice(0, 2) : '--',
                    value: shareValue,
                  }}
                  value={pub?.statistic?.metrics?.all?.value}
                />
              );
            })}
          </Slider>
        ) : (
          <Grid alignItems="center" justify="center" container spacing={3}>
            <Grid item xs={12} className={emptyProjects}>
              <T className={emptyProjectsTitle} variant="h2">
                Подключись к проекту или создай новый, и ты увидешь его здесь!
              </T>
            </Grid>
          </Grid>
        )}
      </Container>
      <Grid alignItems="center" justify="center" container>
        <Grid item xs={12} className={emptyProjects}>
          <LinkButton to={ROUTE.PUBLIC.LIST} color="primary" variant="contained" size="large">
            Перейти к обзору и поиску проектов
          </LinkButton>
          <Button className={createBtn} color="primary" variant="outlined" size="large" onClick={createProject}>
            <PlusIcon />
            <span>Создать проект</span>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

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
  createBtn: {
    margin: theme.spacing(2, 0, 4),
  },
  emptyProjects: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  emptyProjectsTitle: {
    marginBottom: 32,
    textAlign: 'center',
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
