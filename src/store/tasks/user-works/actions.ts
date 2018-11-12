import { requestActions } from 'src/store/@common/requestActions';
import { Project } from 'src/store/projects';
import { CREATE_USER_WORK_FORM_NAME, EDIT_USER_WORK_DESCRIPTION_FORM } from './consts';

export interface IUserWorkData {
  description?: string;
  projectId: number;
  taskId?: number | string;
  title?: string;
}

export interface IPostData {
  project: Project;
  userWork: IUserWorkData;
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

export const postAndStartUserWork = requestActions<IPostData>(
  'USER_WORK/POST_AND_START',
  ({ project, userWork }: IPostData): any => ({
    form: CREATE_USER_WORK_FORM_NAME,
    projectId: userWork.projectId,
    request: {
      data: userWork,
      method: 'POST',
      url: '/user-works',
    },
    taskId: userWork.taskId,
  })
);

export const patchUserWork = requestActions<IUpdateUserWork>(
  'USER_WORK/PATCH',
  ({ projectId, taskId, userWorkId, ...data }: IUpdateUserWork) => ({
    form: EDIT_USER_WORK_DESCRIPTION_FORM + userWorkId,
    projectId,
    request: {
      data,
      method: 'PATCH',
      url: `/user-works/${userWorkId}`,
    },
    taskId,
    userWorkId,
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
