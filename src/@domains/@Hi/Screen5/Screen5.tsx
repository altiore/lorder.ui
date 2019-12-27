import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Person from '@components/Person';

import Block from '@domains/@Hi/@common/Block';
import BlockContent from '@domains/@Hi/@common/BlockContent';
import ScreenTitle from '@domains/@Hi/@common/ScreenTitle';
import SubTitle from '@domains/@Hi/@common/SubTitle';
import { IProjectMember } from '@types';
import { useStyles } from './styles';
import ProjectsAch from './ProjectsAch';
import PublicProjectsAch from './PublicProjectsAch';
import UsersAch from './UsersAch';

interface Screen5I {
  team: IProjectMember[];
}

const Screen5: React.FC<Screen5I> = ({ team }) => {
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
          <Grid container justify="space-evenly" alignItems="center" spacing={4}>
            {team.map(({ avatar, email }) => (
              <Person key={email} avatar={avatar} name={email} />
            ))}
          </Grid>
        </BlockContent>
      </Block>
    </>
  );
};

export default Screen5;
