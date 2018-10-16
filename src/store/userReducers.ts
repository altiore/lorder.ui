import { Reducer } from 'redux';

import { IState } from '../@types';
import { projects } from './projects';
import { taskTypes } from './task-types';
import { userTasks } from './user-tasks';

export const userReducers: Partial<Reducer<IState>> = {
  projects,
  taskTypes,
  userTasks,
};
