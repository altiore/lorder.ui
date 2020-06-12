import { fetchProjectTasksA } from '../actions';
import { projectTasks } from '../selectorsCombined';

const PER_PAGE_COUNT = 100;

export const fetchProjectTasks = (projectId, skip = 0, force: boolean = false) => async (dispatch, getState) => {
  const res = await dispatch(fetchProjectTasksA({ projectId, skip, count: PER_PAGE_COUNT }, force));
  if (projectTasks(getState()).length < res?.payload?.data?.total) {
    if (!res?.payload?.data?.data?.length) {
      console.warn(
        'В ответе сервера нет данных, но данные получены не все. Нужно обработать случай, когда задача появляется новая задача, добавленная кем-то другим!'
      );
      return;
    }
    await dispatch(fetchProjectTasks(projectId, skip + PER_PAGE_COUNT));
  }
};
