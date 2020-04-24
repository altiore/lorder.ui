import identity from 'lodash/identity';
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';

import { requestActions } from '#/@store/@common/requestActions';
import { Project } from '#/@store/projects';

import { CREATE_USER_WORK_FORM_NAME, EDIT_USER_WORK_DESCRIPTION_FORM } from './consts';

import { IUserWork } from '@types';

export interface IUserWorkData {
  description?: string;
  projectId: number;
  taskId?: number | string;
  sequenceNumber?: number | string;
  title?: string;
}

export interface IPostData {
  project: Project;
  userWork: IUserWorkData;
  userId?: number;
}

export interface IUpdateUserWork {
  projectId: number;
  taskId: number | string;
  userWorkId: number;
  duration?: number;
  description?: number;
}

export interface IUserWorkDelete {
  projectId: number | string;
  taskId: number | string;
  userWorkId: number;
}

export const getUserWorks = requestActions(
  'USER_WORK/GET_MANY',
  ({ count = 40, skip = 0, orderBy = 'startAt', order = 'desc' }): any => ({
    request: {
      params: {
        count,
        order,
        orderBy,
        skip,
      },
      url: '/user-works/recent',
    },
  })
);

export const patchUserWork = requestActions('USER_WORK/PATCH', (userWork: Partial<IUserWork>) => ({
  data: userWork,
  form: EDIT_USER_WORK_DESCRIPTION_FORM + userWork.id,
  projectId: userWork.projectId,
  request: {
    data: {
      ...pickBy(
        pick(userWork, ['description', 'finishAt', 'startAt', 'value', 'source', 'taskId', 'projectId']),
        identity
      ),
      finishAt: userWork.finishAt || null,
    },
    method: 'PATCH',
    url: `/user-works/${userWork.id}`,
  },
  taskId: userWork.taskId,
  userWorkId: userWork.id,
}));

export const postAndStartUserWork = requestActions<IPostData>(
  'USER_WORK/POST_AND_START',
  ({ project, userWork }: IPostData): any => ({
    form: CREATE_USER_WORK_FORM_NAME,
    project,
    // projectId required here because of nested reducers!!!
    projectId: project.id,
    request: {
      data: userWork,
      method: 'POST',
      url: '/user-works',
    },
    taskId: userWork.taskId,
  })
);

export const patchAndStopUserWork = requestActions<IUserWorkDelete>(
  'USER_WORK/PATCH_AND_STOP',
  ({ projectId, taskId, userWorkId }: IUserWorkDelete) => ({
    projectId,
    request: {
      method: 'PATCH',
      url: `/user-works/${userWorkId}/stop`,
    },
    taskId,
    userWorkId,
  })
);

export const deleteUserWork = requestActions<IUserWorkDelete>(
  'USER_WORK/DELETE',
  ({ projectId, taskId, userWorkId }: IUserWorkDelete): any => ({
    projectId,
    request: {
      method: 'DELETE',
      url: `/user-works/${userWorkId}`,
    },
    success: 'Задача успешно удалена',
    taskId,
    userWorkId,
  })
);

export const getUserWorksBySequenceNumber = requestActions(
  'USER_WORK/GET_MANY_BY_TASK_SEQUENCE_NUMBER',
  (projectId, sequenceNumber, { count = 20, skip = 0, orderBy = 'startAt', order = 'desc' } = {}): any => ({
    request: {
      params: {
        count,
        order,
        orderBy,
        skip,
      },
      url: `/user-works/project/${projectId}/task/${sequenceNumber}`,
    },
  })
);
