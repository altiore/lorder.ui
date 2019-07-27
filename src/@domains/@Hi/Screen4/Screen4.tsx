import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import AuthForm from '@domains/@common/AuthForm';
import Block from '@domains/@Hi/@common/Block';
import BlockContent from '@domains/@Hi/@common/BlockContent';
import ScreenTitle from '@domains/@Hi/@common/ScreenTitle';
import StarItem from './StarItem';
import { useStyles } from './styles';

interface Screen4I {
  services?: any[];
}

const LIST = [
  'Главная ценность - это человек. Мы сами являемся пользователями нашего проекта, поэтому относимся к каждому члену нашего дружного коллектмва, как к самим себее',
  'Удобство пользователя - превыше всего.',
  'Справедливое распределение результатов работы между членами команды',
  'Удобное управление задачами в проекте',
  'Мы стараемся учесть интересы максимально возможного количества активных пользователей; людей, занимающих активную жизненную позицию, которые заинтересованы в совершенствовании мира',
  'Главная цель - сделать мир более организованным и справедливым для умных людей, создающих блага, целеустремленных, заинтересованных в успехе',
];

const Screen4: React.FC<Screen4I> = ({ services }) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Block className={classes.content}>
      <ScreenTitle black>Преимущества нашего сервиса:</ScreenTitle>
      <VisibilitySensor onChange={setIsVisible} partialVisibility>
        <BlockContent black>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Collapse in={isVisible} timeout={2000}>
                <List>
                  {LIST.map((text, index) => (
                    <StarItem key={index}>{text}</StarItem>
                  ))}
                </List>
              </Collapse>
            </Grid>
            <Grid item xs={5}>
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
