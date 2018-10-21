import { Reducer } from 'redux';

import { IState } from '../@types';
import { project } from './project';
import { projects } from './projects';
import { taskTypes } from './task-types';
import { timer } from './timer';
import { userWorks } from './user-works';

export const userReducers: Partial<Reducer<IState>> = {
  project,
  projects,
  taskTypes,
  timer,
  userWorks,
};
