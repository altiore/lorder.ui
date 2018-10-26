import { Reducer } from 'redux';

import { IState } from '../@types';
import { project } from './project';
import { projects } from './projects';
import { taskTypes } from './task-types';
import { tasks } from './tasks';
import { timer } from './timer';

export const userReducers: Partial<Reducer<IState>> = {
  project,
  projects,
  taskTypes,
  tasks,
  timer,
};
