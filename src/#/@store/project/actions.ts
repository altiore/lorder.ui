import { createAction } from 'redux-actions';

import { requestActions } from '#/@store/@common/requestActions';

import { IProjectPart } from '@types';

export const selectProject = createAction('CURRENT_PROJECT/SELECT');

export const fetchProjectRolesAct = requestActions('CURRENT_PROJECT/FETCH_ROLES', projectId => ({
  request: {
    url: `/projects/${projectId}/roles`,
  },
}));

export const createProjectRoleAct = requestActions(
  'CURRENT_PROJECT/ADD_ROLE',
  (projectId: number, data: { roleId: string; allowedMoveIds?: number[]; name?: string }) => ({
    form: 'CreateProjectRoleForm',
    request: {
      data: {
        allowedMoveIds: [],
        ...data,
      },
      method: 'POST',
      url: `/projects/${projectId}/roles`,
    },
  })
);

export const deleteProjectRoleAct = requestActions(
  'CURRENT_PROJECT/DELETE_ROLE',
  (projectId: number, roleId: string) => ({
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/roles/${roleId}`,
    },
  })
);

export const fetchProjectPartsAct = requestActions('CURRENT_PROJECT/FETCH_PARTS', projectId => ({
  request: {
    url: `/projects/${projectId}/parts`,
  },
}));

export const createProjectPartAct = requestActions(
  'CURRENT_PROJECT/CREATE_PROJECT_PART',
  (projectId: number, data: Omit<IProjectPart, 'id' | 'projectId'>) => ({
    form: 'CreateProjectPartForm',
    request: {
      data,
      method: 'POST',
      url: `/projects/${projectId}/parts`,
    },
  })
);

export const deleteProjectPartAct = requestActions(
  'CURRENT_PROJECT/DELETE_PROJECT_PART',
  (projectId: number, partId: number) => ({
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/parts/${partId}`,
    },
  })
);
