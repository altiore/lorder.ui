import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { getProjectById } from '#/@store/projects';
import { allTaskLength, isTasksLoaded, isTasksLoading, sortedByFilterTasksWithActive } from '#/@store/tasks';
import { searchTerm } from '#/@store/tasksFilter';
import { isTimerStarted } from '#/@store/timer';
import { currentTaskId } from '#/@store/timer';

import { ITasksListProps, TasksListJsx } from './TasksList';

const mapStateToProps = createStructuredSelector({
  allTaskLength,
  currentTaskId,
  getProjectById,
  isTasksLoaded,
  isTasksLoading,
  isTimerStarted,
  searchTerm,
  tasks: sortedByFilterTasksWithActive,
} as any);

export const TasksList = connect<Partial<ITasksListProps>, Partial<ITasksListProps>, {}>(mapStateToProps as any)(
  TasksListJsx as any
);
