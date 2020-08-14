import React from 'react';

import ProjectsList from './projects-list';
import SearchSection from './search-section';

export const PublicProjects: React.FC = (): JSX.Element => {
  return (
    <>
      <SearchSection />
      <ProjectsList />
    </>
  );
};
