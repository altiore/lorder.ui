import { feedbacks } from './feedback/reducer';
import { project } from './project';
import { projects } from './projects';
import { taskTypes } from './task-types';
import { tasks } from './tasks';
import { tasksFilter } from './tasksFilter/reducer';
import { timer } from './timer';
import { userWorks } from './user-works';
import { users } from './users';

export const adminReducers = {
  feedbacks,
  project,
  projects,
  taskTypes,
  tasks,
  tasksFilter,
  timer,
  userWorks,
  users,
};
