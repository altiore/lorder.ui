import React, { memo, useMemo, useState } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import InputSearch from '@components/input-search';

import HeaderWithButton from '../project-values/header-with-button';
import Slider from './slider';

import { IMember } from '@types';

export const ProjectTeam: React.FC<{ members: any[] }> = memo(({ members }) => {
  const [searchName, setSearchName] = useState('');

  const filteredMembersList = useMemo<IMember[]>(() => {
    if (searchName && members && members.length) {
      return members.filter(m => m?.member?.displayName?.toLowerCase().includes((searchName || '').toLowerCase()));
    }

    return members || [];
  }, [searchName, members]);

  const handleSearch = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(value);
  };
  const { sectionWrap, sliderWrap, tagline } = useStyles();

  return (
    <section className={sectionWrap}>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <HeaderWithButton title="НАША КОМАНДА" buttonText="Редактировать" />
          <p className={tagline}>Мы дарим людям мир и красоту, но только, если это будет добром!</p>
          <InputSearch searchCallback={handleSearch} placeholder="Найти участника по имени" variant="Centered" />
        </Grid>
      </Container>
      <div className={sliderWrap}>
        {Boolean(filteredMembersList.length) && <Slider members={filteredMembersList} />}
      </div>
    </section>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  sectionWrap: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flexFlow: 'column',
    flexWrap: 'wrap',
    paddingTop: 145,
  },
  sliderWrap: {
    height: 409,
    marginBottom: 80,
    marginTop: 80,
    maxWidth: 1290,
    padding: '0 70px',
    width: '100%',
  },
  tagline: {
    color: 'rgb(35, 35, 35)',
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 300,
    lineHeight: 1.133,
    marginBottom: 40,
    marginTop: 0,
    textAlign: 'center',
  },
}));
