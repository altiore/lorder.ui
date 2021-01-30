import React, { useEffect } from 'react';

import ProjectsList from './projects-list';
import SearchSection from './search-section';

import { useSearch } from '@hooks/use-search';
import { IProjectStatistic } from '@types';

const getProjectSearchTerm = p => p?.title || '';

interface IProps {
  fetchProjectsStatisticAct: any;
  isLoading: boolean;
  projectPubList: IProjectStatistic[];
}

export const PublicProjects: React.FC<IProps> = ({
  fetchProjectsStatisticAct,
  isLoading,
  projectPubList,
}): JSX.Element => {
  useEffect(() => {
    fetchProjectsStatisticAct();
  }, [fetchProjectsStatisticAct]);

  const { onChange, filtered } = useSearch(projectPubList, getProjectSearchTerm);

  return (
    <>
      <SearchSection onChange={onChange} />
      <ProjectsList filteredList={filtered} isLoading={isLoading} />
    </>
  );
};
