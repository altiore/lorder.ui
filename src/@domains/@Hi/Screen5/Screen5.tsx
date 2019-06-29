import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Block from '@domains/@Hi/@common/Block';
import BlockContent from '@domains/@Hi/@common/BlockContent';
import ScreenTitle from '@domains/@Hi/@common/ScreenTitle';
import SubTitle from '@domains/@Hi/@common/SubTitle';
import Achievement from './Achievement';
import Person from './Person';
import { useStyles } from './styles';

const achievements = [
  {
    title: 'Пользователей',
    value: 63,
  },
  {
    title: 'Проектов',
    value: 200,
  },
  {
    title: 'Публичных проектов',
    value: 5,
  },
];

interface Screen5I {
  team: Array<{
    avatar: string;
    name: string;
  }>;
}

const Screen5: React.FC<Screen5I> = ({ team }) => {
  const classes = useStyles();

  return (
    <>
      <Block alignItems="flex-start" grow className={classes.achievement}>
        <ScreenTitle>Достижения</ScreenTitle>
        <BlockContent>
          <Grid container justify="space-evenly" alignItems="center" spacing={4}>
            {achievements.map(({ title, value }) => (
              <Achievement key={title} title={title} value={value} />
            ))}
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
            {team.map(({ avatar, name }) => (
              <Person key={name} avatar={avatar} name={name} />
            ))}
          </Grid>
        </BlockContent>
      </Block>
    </>
  );
};

export default Screen5;
