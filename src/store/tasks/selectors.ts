import { createSelector } from 'reselect';

import { IState } from 'src/@types';

export const allTasks = (state: IState) => state.tasks;

export const allTaskList = createSelector(allTasks, dr => dr.list);

export const filteredTaskList = createSelector(allTaskList, tasks => tasks);
