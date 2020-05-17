import { createAction } from 'redux-actions';

export const changeTasksFilter = createAction('TASKS_FILTER/CHANGE');

type filterType = 'search' | 'users';
export interface IChangeFilterP {
  filter: filterType;
  value: any;
}

export const changeFilter = createAction<IChangeFilterP, filterType, any>(
  'TASKS_FILTER/CHANGE_FILTER',
  (filter, value): any => ({ filter, value })
);

export const toggleMemberA = createAction<number>('TASKS_FILTER/TOGGLE_MEMBER');

export const toggleOpenedTab = createAction<number>('TASKS_FILTER/TOGGLE_TASK_TYPE');
