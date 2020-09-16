import { createApiAction } from 'redux-actions-api';

import { PROJECT_PART_FORM } from './consts';

import { IProjectPart } from '@types';

export const fetchProjectPartsAct = createApiAction('PROJECT_PARTS/FETCH_PARTS', projectId => ({
  projectId,
  request: {
    url: `/projects/${projectId}/parts`,
  },
}));

export const createProjectPartAct = createApiAction(
  'PROJECT_PARTS/CREATE_PROJECT_PART',
  (projectId: number, data: Omit<IProjectPart, 'id' | 'projectId'>) => ({
    form: PROJECT_PART_FORM,
    projectId,
    request: {
      data,
      method: 'POST',
      url: `/projects/${projectId}/parts`,
    },
  })
);

export const updateProjectPartAct = createApiAction(
  'PROJECT_PARTS/UPDATE_PROJECT_PART',
  (partId: number, projectId: number, data: Omit<IProjectPart, 'id' | 'projectId'>) => ({
    form: PROJECT_PART_FORM,
    projectId,
    request: {
      data,
      method: 'PATCH',
      url: `/projects/${projectId}/parts/${partId}`,
    },
  })
);

export const deleteProjectPartAct = createApiAction(
  'PROJECT_PARTS/DELETE_PROJECT_PART',
  (projectId: number, partId: number) => ({
    projectId,
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/parts/${partId}`,
    },
  })
);
