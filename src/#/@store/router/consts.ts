export const TASKS_ROUTE = (projectId: string | number = ':projectId') => `/projects/${projectId}/tasks`;
export const ROUTE = {
  AUTH: {
    LOGIN: '/auth/signin',
    REGISTER: '/auth/signup',
  },
  PROFILE: '/profile',
  PUBLIC: {
    LIST: '/public',
    ONE: (uuid: string = ':uuid') => `/public/${uuid}`,
  },
};
