import { handleActions } from 'redux-actions';

import { changeTasksFilter } from './actions';

const changeTasksFilterHandler = (state: any, { payload }: any) => {
  return { filter: payload.target.value };
};

export const tasksFilter = handleActions(
  {
    [changeTasksFilter.toString()]: changeTasksFilterHandler,
  },
  { filter: 'recent' }
);
