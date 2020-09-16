import { createApiAction } from 'redux-actions-api';

export const getAllProjectTaskTypes = createApiAction('PROJECT_TASK_TYPE/GET_ALL', (projectId: number) => ({
  projectId,
  request: {
    url: `/projects/${projectId}/task-types`,
  },
}));

export const addTaskTypeToProject = createApiAction(
  'PROJECTS/TASK_TYPES/POST',
  ({ projectId, taskTypeId }: { projectId: number; taskTypeId: number }) => ({
    projectId,
    request: {
      data: { taskTypeId },
      method: 'POST',
      url: `/projects/${projectId}/task-types`,
    },
    success: {
      message: '+ еще один тип задачи...',
    },
    taskTypeId,
  })
);

export const deleteTaskTypeFromProject = createApiAction(
  'PROJECTS/TASK_TYPES/DELETE',
  ({ projectId, taskTypeId }: { projectId: number; taskTypeId: number }) => ({
    error: false,
    projectId,
    request: {
      data: { taskTypeId },
      method: 'DELETE',
      url: `/projects/${projectId}/task-types`,
    },
    success: {
      message: 'А это здесь лишнее...',
    },
    taskTypeId,
  })
);
