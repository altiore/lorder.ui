import { showWarning } from '#/@store/notifications';
import { selectedProjectRole } from '#/@store/tasksFilter';

import { moveProjectTaskAct } from '../actions';

export const moveProjectTask = data => async (dispatch, getState) => {
  try {
    const selectedRole = selectedProjectRole(getState());
    await dispatch(
      moveProjectTaskAct({
        ...data,
        selectedRole,
      })
    );
  } catch (e) {
    dispatch(
      showWarning({
        message: e?.error?.response?.data?.message || 'Задача должно пройти все промежуточные этапы',
        title: 'Действие невозможно',
      })
    );
  }
};
