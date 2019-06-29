import { requestActions } from '@store/@common/requestActions';

import { PROJECT_MEMBER_FORM_NAME } from '@store/projects';

export interface IProjectMemberData {
  memberId?: number;
  projectId: number;
  email?: string;
  accessLevel?: number;
}

export const acceptInvitation = requestActions<number>('PROJECT_MEMBER/ACCEPT_INVITATION', projectId => ({
  projectId,
  request: {
    method: 'PATCH',
    url: `/projects/${projectId}/members/accept`,
  },
  success: {
    message: `Приглашение принято`,
    title: 'Успех!',
  },
}));

export const postProjectMember = requestActions<IProjectMemberData>(
  'PROJECT_MEMBER/POST',
  ({ projectId, email }: IProjectMemberData) => ({
    email,
    form: PROJECT_MEMBER_FORM_NAME,
    projectId,
    request: {
      data: { email },
      method: 'POST',
      url: `/projects/${projectId}/members`,
    },
    success: {
      message: `Приглашение для пользователя ${email} успешно выслано`,
      title: 'Успех!',
    },
  })
);

export const deleteProjectMember = requestActions<IProjectMemberData>(
  'PROJECT_MEMBER/DELETE',
  ({ memberId, projectId }: IProjectMemberData) => ({
    form: PROJECT_MEMBER_FORM_NAME,
    memberId,
    projectId,
    request: {
      data: { id: memberId },
      method: 'DELETE',
      url: `/projects/${projectId}/members`,
    },
    success: {
      message: `Пользователь удален из проекта`,
    },
  })
);

export const updateProjectMemberAccessLevel = requestActions<IProjectMemberData>(
  'PROJECT_MEMBER/UPDATE',
  ({ memberId, projectId, accessLevel }: IProjectMemberData) => ({
    memberId,
    projectId,
    request: {
      data: { accessLevel },
      method: 'PATCH',
      url: `/projects/${projectId}/members/${memberId}`,
    },
    success: {
      message: `Вы успешно изменили права доступа пользователю`,
    },
  })
);
