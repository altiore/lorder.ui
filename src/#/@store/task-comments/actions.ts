import { requestActions } from '#/@store/@common/requestActions';
import { TASKS_ROUTE } from '#/@store/router';

const BASE_ACTION = 'TASK_COMMENTS/';

export const getTaskComments = requestActions(
  `${BASE_ACTION}/GET_TASK_COMMENTS`,
  (projectId: number, taskId: number) => ({
    request: {
      params: {},
      url: `${TASKS_ROUTE(projectId)}/${taskId}/comments`,
    },
  })
);

export const postTaskComment = requestActions(
  `${BASE_ACTION}/ADD_TASK_COMMENT`,
  (projectId: number, taskId: number, comment: string) => {
    return {
      error: { message: `Минимальная длинна - 3 символа`, title: 'Провал!' },
      request: {
        data: {
          text: comment,
        },
        method: 'POST',
        url: `${TASKS_ROUTE(projectId)}/${taskId}/comments`,
      },
      success: {
        message: `Комментарий успешно добавлен`,
        title: 'Успех!',
      },
    };
  }
);

export const deleteTaskComments = requestActions(
  `${BASE_ACTION}/DELETE_TASK_COMMENT`,
  (projectId: number, taskId: number, commentId: number) => ({
    error: { message: `Ошибка при удалении`, title: 'Провал!' },
    request: {
      method: 'DELETE',
      url: `${TASKS_ROUTE(projectId)}/${taskId}/comments/${commentId}`,
    },
    success: {
      message: `Комментарий успешно удален`,
      title: 'Успех!',
    },
    taskId,
  })
);
