import React, { useMemo } from 'react';

import { Container, Grid } from '@material-ui/core';

import InputSearch from '@components/InputSeach';

import HeaderWithButton from '../ProjectValues/HeaderWithButton';
import Slider from './Slider';
import { useStyles } from './styles';

import { IUser } from '@types';

const searchCbStub = () => ({});

export const ProjectTeam: React.FC<{ members: any[] }> = ({ members }) => {
  const membersForSlider: IUser[] = useMemo(() => members.map(({ member }: { member: IUser }) => member), [members]);
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
      <div className={classes.sliderWrap}>
        <Slider members={membersForSlider} />
      </div>
    </section>
  );
};
