import { requestActions } from 'src/store/@common/requestActions';
import { CREATE_USER_WORK_FORM_NAME } from './consts';

export interface IUserWorkData {
  description: string;
  projectId: number;
  taskId: number;
  title: string;
}

export interface IUserWorkDelete {
  projectId: number;
  taskId: number;
}

export const getAllUserWorks = requestActions<number>(
  'USER_TASKS/GET',
  (projectId: number): any => ({
    projectId,
    request: {
      url: `/projects/${projectId}/user-works`,
    },
  })
);

export const postAndStartUserWork = requestActions<IUserWorkData>(
  'USER_TASKS/POST_AND_START',
  ({ projectId, ...data }: IUserWorkData): any => ({
    form: CREATE_USER_WORK_FORM_NAME,
    projectId,
    request: {
      data,
      method: 'POST',
      url: `/projects/${projectId}/user-works`,
    },
  })
);

export const patchAndStopUserWork = requestActions<IUserWorkDelete>(
  'USER_TASKS/PATCH_AND_STOP',
  ({ projectId, taskId }: IUserWorkDelete) => ({
    request: {
      method: 'PATCH',
      url: `/projects/${projectId}/user-works/${taskId}`,
    },
  })
);

export const deleteUserWork = requestActions<IUserWorkDelete>(
  'USER_TASKS/DELETE',
  ({ projectId, taskId }: IUserWorkDelete): any => ({
    projectId,
    request: {
      method: 'DELETE',
      url: `/projects/${projectId}/user-works/${taskId}`,
    },
    success: 'Задача успешно удалена',
    taskId,
  })
);
