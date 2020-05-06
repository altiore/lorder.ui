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

export const toggleMember = createAction<number>('TASKS_FILTER/TOGGLE_MEMBER');
