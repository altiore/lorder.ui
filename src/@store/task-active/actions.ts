import { requestActions } from '@store/@common/requestActions';
import { IListDto } from '@types';

const BASE_ACTION = 'ACTIVE_TASK/TASK_LOGS';

export interface ITaskLogsListDto extends IListDto {
  projectId: number;
  taskId: number;
}

export const fetchTaskLogsAction = requestActions<ITaskLogsListDto>(
  `${BASE_ACTION}/FETCH_ALL`,
  ({ projectId, taskId, ...listDto }) => ({
    request: {
      params: {
        count: 10,
        order: 'desc',
        orderBy: 'createdAt',
        ...listDto,
      },
      url: `/projects/${projectId}/tasks/${taskId}/task-logs`,
    },
  })
);
