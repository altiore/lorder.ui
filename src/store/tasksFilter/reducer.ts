import { handleActions } from 'redux-actions';

import { ITasksFilter } from 'src/@types';
import { changeFilter, changeTasksFilter, IChangeFilterP, toggleMember } from './actions';
import { TasksFilter } from './TasksFilter';

interface IP {
  payload?: IChangeFilterP;
}
interface IP2 {
  payload?: number;
}

const changeFilterHandler = (state: ITasksFilter, { payload }: IP) => {
  if (!payload) {
    throw new Error('Payload is required');
  }
  return new TasksFilter({
    ...state,
    [payload.filter]: payload.value,
  });
};

const changeTasksFilterHandler = (state: ITasksFilter, { payload }: any) => {
  return new TasksFilter({
    ...state,
    filter: payload,
  });
};

const toggleMemberHandler = (state: ITasksFilter, { payload }: IP2) => {
  if (!payload) {
    throw new Error('Payload is required');
  }
  const index = state.members.indexOf(payload);
  let members;
  if (~index) {
    members = [...state.members.slice(0, index), ...state.members.slice(index + 1)];
  } else {
    members = [...state.members, payload];
  }
  return new TasksFilter({
    ...state,
    members,
  });
};

export const tasksFilter = handleActions(
  {
    [changeFilter.toString()]: changeFilterHandler,
    [changeTasksFilter.toString()]: changeTasksFilterHandler,
    [toggleMember.toString()]: toggleMemberHandler,
  },
  new TasksFilter()
);
