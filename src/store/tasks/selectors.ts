import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { Task } from './Task';

export const allTasks = (state: IState) => state.tasks;

export const allTaskList = createSelector(allTasks, dr => dr.list);

export const filteredTaskList = createSelector(allTaskList, tasks => tasks);

export const getEditTaskInitialValues = createSelector([allTaskList], (allTaskList: Task[]) => (taskId: number) =>
  allTaskList.find((el: Task) => el.id === taskId)
);
