import React, { useCallback, useMemo, useState } from 'react';
import FlipMove from 'react-flip-move';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { Project } from '#/@store/projects';

import { Filter } from './Filter';
import Pagination from './Pagination';
import TaskComponent from './TaskComponent';

import { ITask } from '@types';

export interface ITasksListProps {
  currentTaskId?: number | string;
  getProjectById: (id: number | string) => Project;
  tasks: Array<ITask | 'filter'>;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 521,
    maxWidth: 820,
    overflow: 'hidden',
    padding: theme.spacing(0, 1, 1),
    [theme.breakpoints.down('sm')]: {
      height: 480,
      padding: theme.spacing(0, 0, 1),
    },
  },
}));

export const TasksListJsx = ({ currentTaskId, getProjectById, tasks }) => {
  const [page, setPage] = useState<number>(0);
  const [perPage] = useState<number>(5);
  const resetPage = useCallback(() => setPage(0), [setPage]);

  const pageTasks = useMemo(() => {
    return [...tasks.slice(0, 2), ...tasks.slice(2 + page * perPage, 2 + (page + 1) * perPage)];
  }, [page, perPage, tasks]);

  const renderListItem = useCallback(
    (task: ITask | 'filter', index: number) => {
      if (!task) {
        return <div key="0" />;
      }
      if (task === 'filter') {
        return (
          <div key={task + index}>
            <Filter resetPage={resetPage} />
          </div>
        );
      }
      const CurrentTaskComponent: any = TaskComponent;
      return (
        <div key={task.id}>
          <CurrentTaskComponent
            isCurrent={currentTaskId === task.id}
            taskId={task.id}
            project={getProjectById(task.projectId)}
          />
        </div>
      );
    },
    [currentTaskId, getProjectById, resetPage]
  );

  const { root } = useStyles();

  return (
    <div>
      <FlipMove className={root}>{pageTasks.map(renderListItem)}</FlipMove>
      <Pagination changePage={setPage} page={page} perPage={perPage} count={tasks.length - 2} />
    </div>
  );
};
