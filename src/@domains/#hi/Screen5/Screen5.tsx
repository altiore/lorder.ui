import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Person from '@components/Person';

import Block from '@domains/#hi/@common/Block';
import BlockContent from '@domains/#hi/@common/BlockContent';
import ScreenTitle from '@domains/#hi/@common/ScreenTitle';
import SubTitle from '@domains/#hi/@common/SubTitle';
import { IProjectMember } from '@types';
import { useStyles } from './styles';
import ProjectsAch from './ProjectsAch';
import PublicProjectsAch from './PublicProjectsAch';
import UsersAch from './UsersAch';

interface Screen5I {
  isPublicAltioreLoaded: boolean;
  isPublicAltioreLoading: boolean;
  team: IProjectMember[];
}

const Screen5: React.FC<Screen5I> = ({ isPublicAltioreLoaded, isPublicAltioreLoading, team }) => {
  const classes = useStyles();

  return (
    <>
      <Block alignItems="flex-start" grow className={classes.achievement}>
        <ScreenTitle>Достижения</ScreenTitle>
        <BlockContent>
          <Grid container justify="space-evenly" alignItems="center" spacing={4}>
            <UsersAch title="Пользователей" />
            <ProjectsAch title="Проектов" />
            <PublicProjectsAch title="Публичных проектов" />
          </Grid>
        </BlockContent>
      </Block>
      <Block className={classes.team}>
        <ScreenTitle black>Команда проекта Altiore</ScreenTitle>
        <SubTitle black>
          <Typography noWrap variant="subtitle2">
            В безумном мире хаоса мы помогаем тебе
          </Typography>
          <Typography noWrap variant="subtitle2">
            навести порядок!
          </Typography>
        </SubTitle>
        <BlockContent>
          {isPublicAltioreLoading || true ? (
            <CircularProgress size={100} color="secondary" />
          ) : (
            <Grid className={classes.personsBlock} container justify="space-evenly" spacing={10}>
              {team.map(({ avatar, email }) => (
                <Grid item key={email}>
                  <Person avatar={avatar} name={email.replace(/@.*$/, '')} />
                </Grid>
              ))}
            </Grid>
          )}
        </BlockContent>
      </Block>
    </>
  );
};

export default Screen5;
