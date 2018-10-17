import { Reducer } from 'redux';

import { IState } from '../@types';
import { project } from './project';
import { projects } from './projects';
import { taskTypes } from './task-types';
import { userTasks } from './user-tasks';

export const userReducers: Partial<Reducer<IState>> = {
  project,
  projects,
  taskTypes,
  userTasks,
};
