import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Person from '@components/person';

import Block from '#/#hi/#/@common/block';
import BlockContent from '#/#hi/#/@common/block-content';
import ScreenTitle from '#/#hi/#/@common/screen-title';
import SubTitle from '#/#hi/#/@common/sub-title';

import { useStyles } from './styles';

import { IMember } from '@types';

interface ScreenTeamI {
  isPublicLorderLoaded: boolean;
  isPublicLorderLoading: boolean;
  name: string;
  team: IMember[];
}

const ScreenTeam: React.FC<ScreenTeamI> = ({ isPublicLorderLoaded, isPublicLorderLoading, name, team }) => {
  const classes = useStyles();

  return (
    <Block name={name} className={classes.team}>
      <ScreenTitle black>Команда проекта Lorder</ScreenTitle>
      <SubTitle>
        <Typography noWrap>В безумном мире хаоса мы помогаем тебе</Typography>
        <Typography noWrap>навести порядок!</Typography>
      </SubTitle>
      <BlockContent className={classes.members}>
        {isPublicLorderLoading ? (
          <div className={classes.loader}>
            <CircularProgress size={100} color="secondary" />
          </div>
        ) : isPublicLorderLoaded ? (
          <Grid className={classes.personsBlock} container justify="space-evenly" spacing={10}>
            {team.map(({ member: { id, avatar, displayName }, memberRole }) => (
              <Grid item key={id}>
                <Person avatar={avatar ? avatar.url : undefined} name={displayName} role={memberRole} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className={classes.loader}>- - - - - - - - - - - - - - - - - -</div>
        )}
      </BlockContent>
    </Block>
  );
};

export default ScreenTeam;
