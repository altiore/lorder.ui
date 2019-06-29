import { Reducer } from 'redux';

import { IState } from '../@types';
import { feedback } from './feedback/reducer';
import { project } from './project';
import { projects } from './projects';
import { taskTypes } from './task-types';
import { tasks } from './tasks';
import { tasksFilter } from './tasksFilter/reducer';
import { timer } from './timer';
import { userWorks } from './user-works';

export const userReducers: Partial<Reducer<IState>> = {
  feedback,
  project,
  projects,
  taskTypes,
  tasks,
  tasksFilter,
  timer,
  userWorks,
};
