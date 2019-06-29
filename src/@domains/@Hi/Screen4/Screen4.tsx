import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import AuthForm from "@domains/@common/AuthForm";
import Block from "@domains/@Hi/@common/Block";
import BlockContent from "@domains/@Hi/@common/BlockContent";
import ScreenTitle from "@domains/@Hi/@common/ScreenTitle";
import StarItem from "./StarItem";
import {useStyles} from "./styles";

interface Screen4I {
  services?: any[];
}

const Screen4: React.FC<Screen4I> = ({services}) => {
  const classes = useStyles();

  return (
    <Block className={classes.content}>
      <ScreenTitle black>
        Преимущества нашего сервиса:
      </ScreenTitle>
      <BlockContent black>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <List>
              <StarItem>
                Главная ценность - это пользователь. Мы сами являемся пользователями, поэтому относимся к каждому пользователю проетка, как к самим себее
              </StarItem>
              <StarItem>
                Удобство пользователя - превыше всего.
              </StarItem>
              <StarItem>
                Справедливое распределение результатов работы между членами команды
              </StarItem>
              <StarItem>
                Удобное управление задачами в проекте
              </StarItem>
              <StarItem>
                Мы стараемся учесть интересы максимально возможного количества активных пользователей, занимающих активную жизненную позицию, людей которые заинтересованы в совершенствовании мира
              </StarItem>
              <StarItem>
                Главная цель - сделать мир более организованным и справедливым для умных людей, создающих блага, целеустремленных, заинтересованных в успехе
              </StarItem>
            </List>
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
    </Block>
  );
};

export default Screen4;