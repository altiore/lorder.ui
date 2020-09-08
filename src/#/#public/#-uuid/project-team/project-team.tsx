import React, { memo } from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { FlippingCard } from '@components/flipping-card/flipping-card';
import InputSearch from '@components/input-search';
import Slider from '@components/slider';

import HeaderWithButton from '#/#public/#-uuid/project-values/header-with-button';

import { useSearch } from '@hooks/use-search';
import { IMember } from '@types';

const getForSearch = m => m?.member?.displayName || '';

interface IProps {
  members: IMember[];
}

export const ProjectTeam: React.FC<IProps> = memo<IProps>(({ members }) => {
  const { onChange, filtered } = useSearch(members, getForSearch);

  const { sectionWrap, sliderWrap, tagline } = useStyles();
  return (
    <section className={sectionWrap}>
      <Container maxWidth="lg">
        <Grid container justify="center">
          <HeaderWithButton title="КОМАНДА ПРОЕКТА" buttonText="Редактировать" />
          <p className={tagline}>Мы дарим людям мир и красоту, но только, если это будет добром!</p>
          <InputSearch searchCallback={onChange} placeholder="Найти участника по имени" variant="Centered" />
        </Grid>
      </Container>
      <div className={sliderWrap}>
        {Boolean(filtered.length) && (
          <Slider>
            {members.map(({ member: { id, avatar, displayName }, memberRole, opinion }) => (
              <FlippingCard
                key={id}
                avatarUrl={avatar?.url || process.env.PUBLIC_URL + '/d-avatar.png'}
                userName={displayName || 'N/A'}
                userRole={memberRole}
                userProfileLink="/"
                profileLinkTitle="Ссылка на профиль"
              >
                {opinion || '[пользователь НЕ высказался о проекте]'}
              </FlippingCard>
            ))}
          </Slider>
        )}
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
    paddingTop: 32,
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
