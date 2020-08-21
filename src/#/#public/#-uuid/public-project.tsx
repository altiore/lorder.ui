import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import LoadingPage from '@components/loading-page';
import { NoMatch } from '@components/no-match';

import FollowProject from './follow-project';
import ProjectMetrics from './metrics';
import ProjectHead from './project-head';
import ProjectTeam from './project-team';
import ProjectValues from './project-values';
import { StatisticTablesTsx } from './statistics-tables/statistics-tables';
import { useStyles } from './styles';
import UsersActivity from './users-activity';

import { IMember, IProject } from '@types';

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

  useEffect(() => {
    if (publicProjectUuid !== matchProjectUuid) {
      fetchPublicProject(matchProjectUuid);
    }
  }, [fetchPublicProject, matchProjectUuid, publicProjectUuid]);

  const project: IProject | undefined = useMemo(() => {
    if (getProjectByUuid && matchProjectUuid) {
      const p = getProjectByUuid(matchProjectUuid);
      if (p?.title) {
        return p;
      }
    }

    return publicProject;
  }, [getProjectByUuid, matchProjectUuid, publicProject]);

  const members = useMemo<IMember[]>(() => {
    return (project && project.members ? project.members.list : []).slice(0).sort((a, b) => {
      if (a.valueSum === b.valueSum) {
        return 0;
      }
      if (a.valueSum > b.valueSum) {
        return -1;
      }
      return 1;
    });
  }, [project]);

  const { sectionWrap } = useStyles();

  if (isLoading || !isLoaded || !members?.length) {
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
      <div className={sectionWrap}>
        <StatisticTablesTsx members={members} userId={userId} />
      </div>
      <ProjectValues />
      <ProjectTeam members={members} />
      <UsersActivity members={members} project={project} />
    </>
  );
};
