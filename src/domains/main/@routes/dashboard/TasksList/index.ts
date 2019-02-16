import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getProjectById } from 'src/store/projects';
import { sortedByFilterTasksWithActive } from 'src/store/tasks';
import { tasksFilter } from 'src/store/tasksFilter';
import { currentTaskId } from 'src/store/timer';
import { ITasksListProps, TasksListJsx } from './TasksList';

const mapStateToProps = createStructuredSelector({
  currentTaskId,
  getProjectById,
  tasks: sortedByFilterTasksWithActive,
  tasksFilter,
});

export const TasksList = connect<Partial<ITasksListProps>, Partial<ITasksListProps>, {}>(mapStateToProps)(TasksListJsx);
