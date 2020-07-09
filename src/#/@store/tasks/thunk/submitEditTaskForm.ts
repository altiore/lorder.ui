import { initialize } from 'redux-form';

import { patchProjectTask, postProjectTask } from '../actions';
import { EDIT_TASK_FORM, ITaskFormData } from '../consts';
import { getTaskInitialsFromTask } from '../selectors';

export const submitEditTaskForm = (values: ITaskFormData) => async dispatch => {
  let result;
  if (values.id) {
    result = await dispatch(patchProjectTask(values));
  } else {
    result = await dispatch(postProjectTask(values));
  }

  // Если успешо сохранили задачу, то заново инициализируем форму так, чтоб все поля стали нетронутыми
  const data = getTaskInitialsFromTask(result?.payload?.data);
  if (data) {
    dispatch(initialize(EDIT_TASK_FORM, data), false);
  }
};
