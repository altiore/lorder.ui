import { createSelector } from 'reselect';

import { defaultProjectId } from 'store/identity/selectors';
import { ownProjectList } from './selectors';

export const ownProjectListNoProjectFirst = createSelector([ownProjectList, defaultProjectId], (list, projectId) => {
  const defaultProject = list.find(el => el && el.id === projectId);
  if (defaultProject) {
    const defProjectIndex = list.findIndex(el => el.id === defaultProject.id);
    return [defaultProject, ...list.slice(0, defProjectIndex), ...list.slice(defProjectIndex + 1)];
  }
  return [...list];
});
