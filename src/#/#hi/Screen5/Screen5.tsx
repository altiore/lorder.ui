import React, { useMemo } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Person from '@components/Person';

import Block from '#/#hi/@common/Block';
import BlockContent from '#/#hi/@common/BlockContent';
import ScreenTitle from '#/#hi/@common/ScreenTitle';
import SubTitle from '#/#hi/@common/SubTitle';
import { IMember } from '#/@store/projects/members/Member';

import ProjectsAch from './ProjectsAch';
import PublicProjectsAch from './PublicProjectsAch';
import { useStyles } from './styles';
import UsersAch from './UsersAch';

interface Screen5I {
  isPublicAltioreLoaded: boolean;
  isPublicAltioreLoading: boolean;
  nameProgress: string;
  nameTeam: string;
  team: IMember[];
}

const Screen5: React.FC<Screen5I> = ({
  isPublicAltioreLoaded,
  isPublicAltioreLoading,
  nameProgress,
  nameTeam,
  team,
}) => {
  const classes = useStyles();

  const preparedTeam = useMemo(() => {
    if (team) {
      return team.filter(m => !!m.member.displayName);
    }
    return [];
  }, [team]);

  return (
    <>
      <Block name={nameProgress} alignItems="flex-start" grow className={classes.achievement}>
        <ScreenTitle>Достижения</ScreenTitle>
        <BlockContent>
          <div className={classes.backTitle}>ALTIORE</div>
          <Grid className={classes.numbers} container justify="space-evenly" alignItems="center" spacing={4}>
            <UsersAch title="Пользователей" />
            <ProjectsAch title="Проектов" />
            <PublicProjectsAch title="Публичных проектов" />
          </Grid>
        </BlockContent>
      </Block>
      <Block name={nameTeam} className={classes.team}>
        <ScreenTitle black>Команда проекта Altiore</ScreenTitle>
        <SubTitle black>
          <Typography noWrap>В безумном мире хаоса мы помогаем тебе</Typography>
          <Typography noWrap>навести порядок!</Typography>
        </SubTitle>
        <BlockContent className={classes.members}>
          {isPublicAltioreLoading ? (
            <div className={classes.loader}>
              <CircularProgress size={100} color="secondary" />
            </div>
          ) : isPublicAltioreLoaded ? (
            <Grid className={classes.personsBlock} container justify="space-evenly" spacing={10}>
              {preparedTeam.map(({ member: { id, avatar, displayName } }) => (
                <Grid item key={id}>
                  <Person avatar={avatar ? avatar.url : undefined} name={displayName} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className={classes.loader}>- - - - - - - - - - - - - - - - - -</div>
          )}
        </BlockContent>
      </Block>
    </>
  );
};

export default Screen5;
