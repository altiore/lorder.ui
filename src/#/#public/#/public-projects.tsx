import React, { useEffect } from 'react';

import ProjectsList from './projects-list';
import SearchSection from './search-section';

import { useSearch } from '@hooks/useSearch';
import { IProjectPub } from '@types';

const getProjectSearchTerm = p => p?.title || '';

interface IProps {
  fetchProjectsPubAct: any;
  isLoading: boolean;
  projectPubList: IProjectPub[];
}

export const PublicProjects: React.FC<IProps> = ({ fetchProjectsPubAct, isLoading, projectPubList }): JSX.Element => {
  useEffect(() => {
    fetchProjectsPubAct();
  }, [fetchProjectsPubAct]);

  const { onChange, filtered } = useSearch(projectPubList, getProjectSearchTerm);

  return (
    <>
      <SearchSection onChange={onChange} />
      <ProjectsList filteredList={filtered} isLoading={isLoading} />
    </>
  );
};
