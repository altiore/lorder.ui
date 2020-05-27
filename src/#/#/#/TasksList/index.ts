import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { getProjectById } from '#/@store/projects';
import { sortedByFilterTasksWithActive } from '#/@store/tasks';
import { searchTerm, tasksFilter } from '#/@store/tasksFilter';
import { currentTaskId } from '#/@store/timer';

import { ITasksListProps, TasksListJsx } from './TasksList';

const mapStateToProps = createStructuredSelector({
  currentTaskId,
  getProjectById,
  searchTerm,
  tasks: sortedByFilterTasksWithActive,
  // tasksFilter,
} as any);

export const TasksList = connect<Partial<ITasksListProps>, Partial<ITasksListProps>, {}>(mapStateToProps as any)(
  TasksListJsx as any
);
