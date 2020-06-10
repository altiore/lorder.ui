import React from 'react';

import { Container, Grid } from '@material-ui/core';

import InputSearch from '@components/InputSeach';

import HeaderWithButton from '../ProjectValues/HeaderWithButton';
import { useStyles } from './styles';

const searchCbStub = () => ({});

export const ProjectTeam = () => {
  const classes = useStyles();

  return (
    <section className={classes.sectionWrap}>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <HeaderWithButton title="НАША КОМАНДА" buttonText="Редактировать" />
          <p className={classes.tagline}>Мы дарим людям мир и красоту, но только, если это будет добром!</p>
          <InputSearch searchCallback={searchCbStub} placeholder="Найти участника по имени" variant="Centered" />
        </Grid>
      </Container>
    </section>
  );
};
