import { handleActions } from 'redux-actions';

import {
  changeFilter,
  changeTasksFilter,
  IChangeFilterP,
  refreshAll,
  toggleMemberA,
  toggleOpenedTab,
  toggleProjectPart,
} from './actions';
import { TasksFilter } from './TasksFilter';

import { ITasksFilter } from '@types';
import { toggleInArray } from '@utils/toggleInArray';

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
  return new TasksFilter({
    ...state,
    members: toggleInArray(state.members, payload),
  });
};

const toggleOpenedTabHandler = (state: ITasksFilter, { payload }: IP2) => {
  if (typeof payload !== 'number') {
    throw new Error('Payload MUST be number');
  }
  return new TasksFilter({
    ...state,
    openedStatuses: toggleInArray(state.openedStatuses || [], payload),
  });
};

const toggleProjectPartHandler = (state: ITasksFilter, { payload }: any) => {
  if (typeof payload !== 'number') {
    throw new Error('Payload MUST be number');
  }
  return new TasksFilter({
    ...state,
    projectPart: payload,
  });
};

const refreshAllHandler = (state: ITasksFilter) => {
  return new TasksFilter({ openedStatuses: state.openedStatuses });
};

export const tasksFilter: any = handleActions<any, any, any>(
  {
    [changeFilter.toString()]: changeFilterHandler,
    [changeTasksFilter.toString()]: changeTasksFilterHandler,
    [toggleMemberA.toString()]: toggleMemberHandler,
    [toggleOpenedTab.toString()]: toggleOpenedTabHandler,
    [toggleProjectPart.toString()]: toggleProjectPartHandler,
    [refreshAll.toString()]: refreshAllHandler,
  },
  new TasksFilter()
);
