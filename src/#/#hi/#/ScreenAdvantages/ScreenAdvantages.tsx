import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Block from '#/#hi/#/@common/Block';
import BlockContent from '#/#hi/#/@common/BlockContent';
import ScreenTitle from '#/#hi/#/@common/ScreenTitle';
import AuthForm from '#/@common/AuthForm';

import StarItem from './StarItem';
import { useStyles } from './styles';

interface ScreenAdvantagesI {
  name: string;
}

const LIST = [
  'Проект создан группой единомышленников с целью сделать труд над социальными проектами выгодным для всех',
  'Главная ценность - это человек. Мы сами являемся пользователями нашего проекта, поэтому относимся к каждому члену нашего дружного коллектива, как к самим себе',
  'Главная цель - сделать мир более организованным и справедливым для людей, которые приносят пользу человечеству, создают блага, раздвигают границы возможностей, совершенствуют мир, делая жизнь приятнее и интереснее',
  'Удобство пользователя - превыше всего!',
  'Справедливость - это инструмент для нового фазового перехода на более высокую ступерь в развитии человека. Справедливое распределение результатов труда между участниками команды достижимо',
  'Мы стараемся учесть интересы максимально возможного количества активных пользователей; людей, занимающих активную жизненную позицию, которые заинтересованы в совершенствовании мира',
];

const ScreenAdvantages: React.FC<ScreenAdvantagesI> = ({ name }) => {
  const classes = useStyles();

  const [isVisible, setIsVisible] = useState(false);

  const theme = useTheme();
  const isFullWidth = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Block name={name} className={classes.content}>
      <ScreenTitle black>Преимущества:</ScreenTitle>
      <VisibilitySensor onChange={setIsVisible} partialVisibility>
        <BlockContent black>
          <Grid alignItems="flex-start" container spacing={2}>
            <Grid item className={classes.list} lg={7} md={7} sm={12} xs={12}>
              <Collapse in={!isFullWidth || isVisible} timeout={2000}>
                <List>
                  {LIST.map((text, index) => (
                    <StarItem key={index}>{text}</StarItem>
                  ))}
                </List>
              </Collapse>
            </Grid>
            <Grid item className={classes.loginWrap} lg={5} md={5} sm={12} xs={12}>
              <Paper className={classes.loginBlock}>
                <Typography gutterBottom color="secondary" className={classes.loginTitle} variant="h5">
                  Присоединитесь к нашей команде просто сейчас
                </Typography>
                <AuthForm />
              </Paper>
            </Grid>
          </Grid>
        </BlockContent>
      </VisibilitySensor>
    </Block>
  );
};

export default ScreenAdvantages;
