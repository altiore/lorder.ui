import { requestActions } from 'src/store/@common/requestActions';
import { CREATE_USER_WORK_FORM_NAME } from './consts';

export interface IUserWorkData {
  description: string;
  projectId: number;
  taskId?: number;
  title?: string;
}

export interface IUserWorkDelete {
  projectId: number;
  taskId: number;
  userWorkId: number;
}

export const postAndStartUserWork = requestActions<IUserWorkData>(
  'USER_WORK/POST_AND_START',
  (data: IUserWorkData): any => ({
    form: CREATE_USER_WORK_FORM_NAME,
    projectId: data.projectId,
    request: {
      data,
      method: 'POST',
      url: '/user-works',
    },
    taskId: data.taskId,
  })
);

export const patchAndStopUserWork = requestActions<IUserWorkDelete>(
  'USER_WORK/PATCH_AND_STOP',
  ({ projectId, taskId, userWorkId }: IUserWorkDelete) => ({
    projectId,
    request: {
      method: 'PATCH',
      url: `/user-works/${userWorkId}`,
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
