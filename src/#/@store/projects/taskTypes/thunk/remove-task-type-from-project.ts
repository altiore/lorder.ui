import { showError } from '#/@store/notifications';

import { deleteTaskTypeFromProject } from '../actions';

export const removeTaskTypeFromProject = (data: { projectId: number; taskTypeId: number }) => async dispatch => {
  try {
    await dispatch(deleteTaskTypeFromProject(data));
  } catch (e) {
    dispatch(
      showError({
        message: e?.error?.response?.data?.message || 'Не удалось удалить тип задачи',
      })
    );
  }
};
