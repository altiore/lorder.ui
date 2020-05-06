import { createAction } from 'redux-actions';

import { requestActions } from '#/@store/@common/requestActions';
import { TASKS_ROUTE } from '#/@store/router';

import { IListDto } from '@types';

const BASE_ACTION = 'ACTIVE_TASK/TASK_LOGS';

export interface ITaskLogsListDto extends IListDto {
  projectId: number;
  sequenceNumber: number;
}

export const fetchTaskLogsAction = requestActions<ITaskLogsListDto>(
  `${BASE_ACTION}/FETCH_ALL`,
  ({ projectId, sequenceNumber, ...listDto }) => ({
    request: {
      params: {
        count: 10,
        order: 'desc',
        orderBy: 'createdAt',
        ...listDto,
      },
      url: `${TASKS_ROUTE(projectId)}/${sequenceNumber}/task-logs`,
    },
  })
);

export const clearTaskLogs = createAction(`${BASE_ACTION}/CLEAR`);
