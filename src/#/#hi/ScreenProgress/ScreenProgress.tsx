import React from 'react';

import Grid from '@material-ui/core/Grid';

import Block from '#/#hi/@common/Block';
import BlockContent from '#/#hi/@common/BlockContent';
import ScreenTitle from '#/#hi/@common/ScreenTitle';

import ProjectsAch from './ProjectsAch';
import PublicProjectsAch from './PublicProjectsAch';
import { useStyles } from './styles';
import UsersAch from './UsersAch';

interface ScreenProgressI {
  name: string;
}

const ScreenProgress: React.FC<ScreenProgressI> = ({ name }) => {
  const classes = useStyles();

  return (
    <Block name={name} alignItems="flex-start" grow className={classes.achievement}>
      <ScreenTitle>Достижения</ScreenTitle>
      <BlockContent>
        <div className={classes.backTitle}>ALTIORE</div>
        <Grid className={classes.numbers} container justify="space-evenly" alignItems="center" spacing={4}>
          <UsersAch title="Пользователей" />
          <ProjectsAch title="Проектов" />
          <PublicProjectsAch title="Публичных проектов" />
        </Grid>
      </BlockContent>
    </Block>
  );
};

export default ScreenProgress;
