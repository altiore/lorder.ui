import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import get from 'lodash/get';

import { AppBar, Divider, Grid, IconButton, Toolbar, Typography } from '@material-ui/core/';

import TelegramIco from '@components/@icons/Telegram';
import { Block } from '@components/Block';
import HeaderFixed from '@components/HeaderFixed';
import LoadingPage from '@components/LoadingPage';
import { NoMatch } from '@components/NoMatch';
import Person from '@components/Person';

import PieChart from '#/@common/PieChart';
import { millisecondsToHours } from '#/@store/@common/helpers';
import { Member } from '#/@store/projects/members/Member';
import { PublicProject } from '#/@store/publicProject';

import FollowProject from './FollowProject';
import ProjectHead from './ProjectHead';
import { useStyles } from './styles';

export interface IPublicProjectProps extends RouteComponentProps<{ projectId: string }> {
  isAuth: boolean;
  fetchPublicProject: any;
  publicProjectData: PublicProject;
  team: Array<{
    image: string;
    name: string;
  }>;
}

export interface IState {
  height: number;
  width: number;
}

export const PublicProjectTsx: React.FC<IPublicProjectProps> = React.memo(
  ({ fetchPublicProject, publicProjectData, isAuth, location, match }) => {
    const project = useMemo(() => {
      return publicProjectData.project;
    }, [publicProjectData]);

    const title = useMemo(() => {
      return publicProjectData.title;
    }, [publicProjectData]);

    const uuid = useMemo(() => {
      return publicProjectData.uuid;
    }, [publicProjectData]);

    const isLoading = useMemo(() => {
      return publicProjectData.isLoading;
    }, [publicProjectData]);

    const isLoaded = useMemo(() => {
      return publicProjectData.isLoaded;
    }, [publicProjectData]);

    const matchProjectUuid = useMemo(() => {
      return match.params.projectId;
    }, [match]);

    const members: Member[] = useMemo(() => {
      return (project && project.members ? project.members : []) as Member[];
    }, [project]);

    useEffect(() => {
      if (fetchPublicProject && matchProjectUuid && !uuid) {
        fetchPublicProject(matchProjectUuid);
      }
    }, [fetchPublicProject, matchProjectUuid, uuid]);

    const classes = useStyles();

    const chartData = useMemo(() => {
      return members.map(el => ({
        name: get(el.member, 'displayName') || get(el.member, 'email', '').replace(/@.*$/, ''),
        y: millisecondsToHours(el.timeSum) || 0.01,
      }));
    }, [members]);

    const chartValueData = useMemo(() => {
      return members.map(el => ({
        name: get(el.member, 'displayName') || get(el.member, 'email', '').replace(/@.*$/, ''),
        y: el.valueSum || 0.1,
      }));
    }, [members]);

    if (isLoading || !isLoaded || !chartData || !chartValueData) {
      return <LoadingPage />;
    }
    if (!title) {
      return <NoMatch location={location} />;
    }

    return (
      <div className={classes.root}>
        <HeaderFixed brandName="Lorder" brandLink="/" />
        <ProjectHead project={project} editProjectLink={`/projects/${project.id}/settings`} isAuth={isAuth} />
        <FollowProject project={project} />
        <Grid container className={classes.content}>
          <Block>
            <Grid item lg={6} md={12} sm={12}>
              <PieChart key={1} data={chartData} title="Статистика по времени" unit="h" />
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              <PieChart key={2} data={chartValueData} title="Статистика по ценности" />
            </Grid>
          </Block>

          <Divider />
          <Block spacing={10}>
            <Grid item className={classes.profile} xs={12}>
              <Typography variant="h4">Команда проекта</Typography>
              <Typography>Мы дарим людям мир и красоту, но только если это будет добром!</Typography>
            </Grid>
            <div className={classes.members}>
              {members.map(member => (
                <Grid item key={member.member.email}>
                  <Person
                    avatar={get(member, 'member.avatar.url', '')}
                    name={get(member.member, 'displayName') || get(member.member, 'email', '').replace(/@.*$/, '')}
                  />
                </Grid>
              ))}
            </div>
          </Block>
        </Grid>
        <AppBar key={'bottom'} position="static" component={'footer'}>
          <Toolbar className={classes.bottomBar}>
            <Typography variant="h6" color="inherit">
              Copyright &copy; Lorder
            </Typography>
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" href={'https://t.me/joinchat/BmXj_kK5vnoAWdQF7tTc1g'} target={'_blank'}>
                <TelegramIco />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
);
