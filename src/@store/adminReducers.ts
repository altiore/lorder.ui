import { feedback } from './feedback/reducer';
import { project } from './project';
import { projects } from './projects';
import { taskActive } from './task-active/reducer';
import { taskTypes } from './task-types';
import { tasks } from './tasks/reducer';
import { tasksFilter } from './tasksFilter/reducer';
import { timer } from './timer';
import { userWorks } from './user-works';
import { users } from './users';

export const adminReducers = {
  feedback,
  project,
  projects,
  taskActive,
  taskTypes,
  tasks,
  tasksFilter,
  timer,
  userWorks,
  users,
};
