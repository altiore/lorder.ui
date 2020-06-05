import React from 'react';

import { Container, Grid } from '@material-ui/core';

import ButtonEdit from '@components/ButtonEdit';

import { useStyles } from './styles';
import ValueDescriptionCard from './ValueDescriptionCard';

export const ProjectValues = (props: any) => {
  const classes = useStyles();
  return (
    <section className={classes.sectionWrap}>
      <Container maxWidth="lg">
        <div className={classes.headerTitleWrap}>
          <h1 className={classes.headerTitle}>ЦЕННОСТИ ПРОЕКТА</h1>
          <div className={classes.editButtonWrap}>
            <ButtonEdit routePath="/" variant="Gray">
              Редактировать
            </ButtonEdit>
          </div>
        </div>
        <Grid container justify="center">
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
        </Grid>
      </Container>
    </section>
  );
};
