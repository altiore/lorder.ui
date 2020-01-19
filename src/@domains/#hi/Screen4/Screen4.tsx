import React, { useState } from 'react';

import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import VisibilitySensor from 'react-visibility-sensor';

import AuthForm from '@domains/@common/AuthForm';
import Block from '@domains/#hi/@common/Block';
import BlockContent from '@domains/#hi/@common/BlockContent';
import ScreenTitle from '@domains/#hi/@common/ScreenTitle';
import StarItem from './StarItem';
import { useStyles } from './styles';

interface Screen4I {
  services?: any[];
}

const LIST = [
  'Главная ценность - это человек. Мы сами являемся пользователями нашего проекта, поэтому относимся к каждому члену нашего дружного коллектива, как к самим себе',
  'Удобство пользователя - превыше всего!',
  'Справедливое распределение результатов работы между членами команды',
  'Удобное управление задачами в проекте',
  'Мы стараемся учесть интересы максимально возможного количества активных пользователей; людей, занимающих активную жизненную позицию, которые заинтересованы в совершенствовании мира',
  'Главная цель - сделать мир более организованным и справедливым для умных людей, создающих блага, целеустремленных, заинтересованных в успехе',
];

const Screen4: React.FC<Screen4I> = ({ services }) => {
  const classes = useStyles();

  const [isVisible, setIsVisible] = useState(false);

  const theme = useTheme();
  const isFullWidth = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Block className={classes.content}>
      <ScreenTitle black>Преимущества нашего сервиса:</ScreenTitle>
      <VisibilitySensor onChange={setIsVisible} partialVisibility>
        <BlockContent black>
          <Grid alignItems="flex-start" container spacing={2}>
            <Grid item lg={7} md={7} sm={12} xs={12}>
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

export default Screen4;
