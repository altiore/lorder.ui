import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { defaultProjectId } from '#/@store/identity/selectors';
import { selectedProjectRole } from '#/@store/tasksFilter/selectors';

import { openedProjectStrategyInfo, openedTaskColumns, ownProjectList } from './selectors';

// export const ownProjectListNoProjectFirst = createDeepEqualSelector(
//   [ownProjectList, defaultProjectId],
//   (list, projectId) => {
//     const defaultProject = list.find(el => el && el.id === projectId);
//     if (defaultProject) {
//       const defProjectIndex = list.findIndex(el => el.id === defaultProject.id);
//       return [defaultProject, ...list.slice(0, defProjectIndex), ...list.slice(defProjectIndex + 1)];
//     }
//     return [...list];
//   }
// );

export const ownProjectListWithoutDefault = createDeepEqualSelector(
  [ownProjectList, defaultProjectId],
  (list, projectId) => {
    return list.slice(0).filter(el => el.id !== projectId);
  }
);

export const projectRoleColumns = createDeepEqualSelector(
  [selectedProjectRole, openedProjectStrategyInfo, openedTaskColumns],
  (role, strategy, taskColumns) => {
    if (role) {
      const userRole = strategy && strategy.userRoles ? strategy.userRoles.find(el => el.id === role) : undefined;
      if (userRole) {
        return userRole.columns;
      }
    }

    return taskColumns;
  }
);
