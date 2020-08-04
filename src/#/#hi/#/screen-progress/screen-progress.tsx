import React from 'react';

import Grid from '@material-ui/core/Grid';

import Block from '#/#hi/#/@common/block';
import BlockContent from '#/#hi/#/@common/block-content';
import ScreenTitle from '#/#hi/#/@common/screen-title';

import ProjectsAch from './projects-ach';
import PublicProjectsAch from './public-projects-ach';
import { useStyles } from './styles';
import UsersAch from './users-ach';

interface ScreenProgressI {
  name: string;
}

const ScreenProgress: React.FC<ScreenProgressI> = ({ name }) => {
  const classes = useStyles();

  return (
    <Block name={name} alignItems="flex-start" grow className={classes.achievement}>
      <ScreenTitle>Достижения</ScreenTitle>
      <BlockContent>
        <div className={classes.backTitle}>LORDER</div>
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
