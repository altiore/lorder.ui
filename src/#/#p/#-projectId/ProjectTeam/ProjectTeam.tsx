import React, { memo, useMemo, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import InputSearch from '@components/InputSeach';

import HeaderWithButton from '../ProjectValues/HeaderWithButton';
import Slider from './Slider';
import { useStyles } from './styles';

import { IUser } from '@types';

export const ProjectTeam: React.FC<{ members: any[] }> = memo(({ members }) => {
  const [searchName, setSearchName] = useState('');

  const membersList: IUser[] = useMemo(() => members.map(({ member }: { member: IUser }) => member), [members]);

  const filteredMembersList = useMemo(() => {
    return membersList.filter(member => member.displayName && member.displayName.includes(searchName));
  }, [searchName, membersList]);

  const handleSearch = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(value);
  };
  const classes = useStyles();

  return (
    <section className={classes.sectionWrap}>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <HeaderWithButton title="НАША КОМАНДА" buttonText="Редактировать" />
          <p className={classes.tagline}>Мы дарим людям мир и красоту, но только, если это будет добром!</p>
          <InputSearch searchCallback={handleSearch} placeholder="Найти участника по имени" variant="Centered" />
        </Grid>
      </Container>
      <div className={classes.sliderWrap}>
        {!(searchName && !filteredMembersList.length) && (
          <Slider members={searchName ? filteredMembersList : membersList} />
        )}
      </div>
    </section>
  );
});
