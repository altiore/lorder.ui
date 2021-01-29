import pick from 'lodash/pick';

import { routeProjectId } from '#/@store/router';

import { editProjectRoleAct } from '../actions';

import { IProjectRole } from '@types';

export const editProjectRole = (roleId: number, data: Partial<IProjectRole>) => async (dispatch, getState) => {
  const projectId = routeProjectId(getState());
  if (!projectId) {
    throw new Error('projectId is not found');
  }
  await dispatch(editProjectRoleAct(projectId, roleId, pick(data, ['isPublic'])));
};
