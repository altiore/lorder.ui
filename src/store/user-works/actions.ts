import identity from 'lodash-es/identity';
import pick from 'lodash-es/pick';
import pickBy from 'lodash-es/pickBy';

import { IUserWork } from 'src/@types';
import { requestActions } from 'src/store/@common/requestActions';
import { EDIT_USER_WORK_DESCRIPTION_FORM } from './consts';

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
