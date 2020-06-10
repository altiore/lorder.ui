import React from 'react';

import { Container, Grid } from '@material-ui/core';

import HeaderWithButton from './HeaderWithButton';
import { useStyles } from './styles';
import ValueDescriptionCard from './ValueDescriptionCard';

export const ProjectValues = (props: any) => {
  const classes = useStyles();
  return (
    <section className={classes.sectionWrap}>
      <Container maxWidth="lg">
        <HeaderWithButton title="ЦЕННОСТИ ПРОЕКТА" buttonText="Редактировать" marginBottom={90} />
        <Grid container justify="center">
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
        </Grid>
      </Container>
    </section>
  );
};
