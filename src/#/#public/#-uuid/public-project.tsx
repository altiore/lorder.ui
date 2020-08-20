import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import get from 'lodash/get';

import LoadingPage from '@components/loading-page';
import { NoMatch } from '@components/no-match';

import { millisecondsToHours } from '#/@store/@common/helpers';
import { Member } from '#/@store/projects/members/Member';

import FollowProject from './follow-project';
import ProjectMetrics from './metrics';
import ProjectHead from './project-head';
import ProjectTeam from './project-team';
import ProjectValues from './project-values';
import { StatisticTablesTsx } from './statistics-tables/statistics-tables';
import { useStyles } from './styles';
import UsersActivity from './users-activity';

import { IProject } from '@types';

export interface IPublicProjectProps extends RouteComponentProps<{ uuid: string }> {
  getProjectByUuid: (uuid: string) => IProject | undefined;
  isAuth: boolean;
  isLoaded?: boolean;
  isLoading?: boolean;
  fetchPublicProject: any;
  publicProject?: IProject;
  publicProjectUuid?: string;
  statistic: any;
  team: Array<{
    image: string;
    name: string;
  }>;
  userId: number;
}

export const PublicProjectTsx: React.FC<IPublicProjectProps> = ({
  getProjectByUuid,
  fetchPublicProject,
  isAuth,
  isLoaded,
  isLoading,
  location,
  match,
  publicProject,
  publicProjectUuid,
  statistic,
  userId,
}) => {
  const matchProjectUuid = useMemo(() => {
    return match.params.uuid;
  }, [match]);

  const project: IProject | undefined = useMemo(() => {
    if (getProjectByUuid && matchProjectUuid) {
      const p = getProjectByUuid(matchProjectUuid);
      if (p?.title) {
        return p;
      }
    }

    return publicProject;
  }, [getProjectByUuid, matchProjectUuid, publicProject]);

  const members: Member[] = useMemo(() => {
    return (project && project.members ? project.members : []) as Member[];
  }, [project]);

  useEffect(() => {
    if (publicProjectUuid !== matchProjectUuid) {
      fetchPublicProject(matchProjectUuid);
    }
  }, [fetchPublicProject, matchProjectUuid, publicProjectUuid]);

  const classes = useStyles();

  const timeTableMembers = useMemo(() => {
    return members.map(el => ({
      id: el.member.id,
      name: get(el.member, 'displayName') || get(el.member, 'email', '').replace(/@.*$/, ''),
      timeSpent: millisecondsToHours(el.timeSum) || 0.1,
      totalPointsEarned: el.valueSum || 0.1,
      y: millisecondsToHours(el.timeSum) || 0.1,
    }));
  }, [members]);

  const pointsTableUsersMembers = useMemo(() => {
    return members.map(el => ({
      id: el.member.id,
      name: get(el.member, 'displayName') || get(el.member, 'email', '').replace(/@.*$/, ''),
      y: el.valueSum || 0.1,
    }));
  }, [members]);

  if (isLoading || !isLoaded || !timeTableMembers || !pointsTableUsersMembers) {
    return <LoadingPage />;
  }
  if (!project?.title) {
    return <NoMatch location={location} />;
  }

  return (
    <>
      <ProjectHead project={project} editProjectLink={`/projects/${project.id}/settings`} isAuth={isAuth} />
      <ProjectMetrics statistic={statistic} />
      <FollowProject project={project} />
      <div className={classes.sectionWrap}>
        <StatisticTablesTsx
          timeTableMembers={timeTableMembers}
          pointsTableMembers={pointsTableUsersMembers}
          userId={userId}
        />
      </div>
      <ProjectValues />
      <ProjectTeam members={get(members, 'list', [])} />
      <UsersActivity members={get(members, 'list', [])} project={project} />
    </>
  );
};
