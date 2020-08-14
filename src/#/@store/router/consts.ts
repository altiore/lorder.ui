export const TASKS_ROUTE = (projectId: string | number = ':projectId') => `/projects/${projectId}/tasks`;
export const ROUTE = {
  PROFILE: '/profile',
  PUBLIC: {
    LIST: '/public',
    ONE: (uuid: string = ':uuid') => `/public/${uuid}`,
  },
};
