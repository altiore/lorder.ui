import { requestActions } from 'src/store/@common/requestActions';
import { CREATE_USER_TASK_FORM_NAME } from './consts';

export interface IUserTaskData {
  description: string;
  projectId: number;
  taskId: number;
  title: string;
}

export interface IUserTaskDelete {
  projectId: number;
  taskId: number;
}

export const getAllUserTasks = requestActions<number>(
  'USER_TASKS/GET',
  (projectId: number): any => ({
    projectId,
    request: {
      url: `/projects/${projectId}/user-tasks`,
    },
  })
);

export const postAndStartUserTask = requestActions<IUserTaskData>(
  'USER_TASKS/POST_AND_START',
  ({ projectId, ...data }: IUserTaskData): any => ({
    form: CREATE_USER_TASK_FORM_NAME,
    projectId,
    request: {
      data,
      method: 'POST',
      url: `/projects/${projectId}/user-tasks`,
    },
  })
);

export const patchAndStopUserTask = requestActions<IUserTaskDelete>(
  'USER_TASKS/PATCH_AND_STOP',
  ({ projectId, taskId }: IUserTaskDelete) => ({
    request: {
      method: 'PATCH',
      url: `/projects/${projectId}/user-tasks/${taskId}`,
    },
  })
);

export const deleteUserTask = requestActions<IUserTaskDelete>(
  'USER_TASKS/DELETE',
  ({ projectId, taskId }: IUserTaskDelete): any => ({
    projectId,
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/user-tasks/${taskId}`,
    },
    success: 'Задача успешно удалена',
    taskId,
  })
);
