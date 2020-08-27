export const TASKS_ROUTE = (projectId: string | number = ':projectId') => `/projects/${projectId}/tasks`;
export const ROUTE = {
  AUTH: {
    LOGIN: '/auth/signin',
    REGISTER: '/auth/signup',
  },
  MAIN: '/',
  PROFILE: '/profile',
  PROJECT: {
    INVITE: (projectId: string | number = ':projectId') => `/projects/${projectId}/invite`,
    MEMBERS: (projectId: string | number = ':projectId') => `/projects/${projectId}/members`,
    ONE: (projectId: string | number = ':projectId') => `/projects/${projectId}`,
    PARTS: (projectId: string | number = ':projectId') => `/projects/${projectId}/parts`,
    ROLES: (projectId: string | number = ':projectId') => `/projects/${projectId}/roles`,
    SETTINGS: (projectId: string | number = ':projectId') => `/projects/${projectId}/settings`,
    STATUS_MOVES: (projectId: string | number = ':projectId') => `/projects/${projectId}/status-moves`,
    TASK: {
      LOGS: (projectId: string | number = ':projectId', sequenceNumber: string | number = ':sequenceNumber') =>
        `/projects/${projectId}/tasks/${sequenceNumber}/task-logs`,
      ONE: (projectId: string | number = ':projectId', sequenceNumber: string | number = ':sequenceNumber') =>
        `/projects/${projectId}/tasks/${sequenceNumber}`,
    },
    TASK_TYPES: (projectId: string | number = ':projectId') => `/projects/${projectId}/task-types`,
    TASKS: (projectId: string | number = ':projectId') => `/projects/${projectId}/tasks`,
  },
  PUBLIC: {
    LIST: '/public',
    ONE: (uuid: string = ':uuid') => `/public/${uuid}`,
  },
};
