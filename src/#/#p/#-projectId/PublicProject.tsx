import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import get from 'lodash/get';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core/';

import TelegramIco from '@components/@icons/Telegram';
import HeaderFixed from '@components/HeaderFixed';
import LoadingPage from '@components/LoadingPage';
import { NoMatch } from '@components/NoMatch';

import { millisecondsToHours } from '#/@store/@common/helpers';
import { Member } from '#/@store/projects/members/Member';

import FollowProject from './FollowProject';
import ProjectMetrics from './Metrics';
import ProjectHead from './ProjectHead';
import ProjectTeam from './ProjectTeam';
import ProjectValues from './ProjectValues';
import { StatisticTablesTsx } from './StatisticsTables/StatisticsTables';
import { useStyles } from './styles';
import UsersActivity from './UsersActivity';

import { IProject } from '@types';

export interface IPublicProjectProps extends RouteComponentProps<{ projectId: string }> {
  isAuth: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  fetchPublicProject: any;
  project: IProject;
  publicProjectUuid: string;
  statistic: any;
  team: Array<{
    image: string;
    name: string;
  }>;
}

export const PublicProjectTsx: React.FC<IPublicProjectProps> = ({
  fetchPublicProject,
  isAuth,
  isLoaded,
  isLoading,
  location,
  match,
  project,
  publicProjectUuid,
  statistic,
}) => {
  const matchProjectUuid = useMemo(() => {
    return match.params.projectId;
  }, [match]);

  const members: Member[] = useMemo(() => {
    return (project && project.members ? project.members : []) as Member[];
  }, [project]);

  useEffect(() => {
    if (publicProjectUuid !== matchProjectUuid) {
      console.log('fetch public project info');
      fetchPublicProject(matchProjectUuid);
    }
  }, [fetchPublicProject, matchProjectUuid, publicProjectUuid]);

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
  if (!project.title) {
    return <NoMatch location={location} />;
  }

  return (
    <div className={classes.root}>
      <div
        style={{
          backgroundColor: 'rgb(41, 41, 43)',
          boxShadow: '-3.536px 3.536px 9.5px 0.5px rgba(0, 0, 0, 0.15)',
        }}
      >
        <HeaderFixed brandName="Lorder" brandLink="/" />
      </div>

      <ProjectHead project={project} editProjectLink={`/projects/${project.id}/settings`} isAuth={isAuth} />
      <ProjectMetrics statistic={statistic} />
      <FollowProject project={project} />
      <div className={classes.sectionWrap}>
        <StatisticTablesTsx timeStatistic={chartData} worthPoints={chartValueData} />
      </div>
      <ProjectValues />
      <ProjectTeam members={get(members, 'list', [])} />
      <UsersActivity members={get(members, 'list', [])} project={project} />
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
};
