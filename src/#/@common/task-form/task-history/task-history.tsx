import React, { useCallback } from 'react';

import HistoryComment from './history-comment';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { ITaskLog } from '@types';

export interface ITaskHistoryProps {
  fetchTaskLogs: any;
  taskLogs?: ITaskLog[];
}

const useStyles = makeStyles(() => ({
  root: {},
}));

export const TaskHistoryTsx: React.FC<ITaskHistoryProps> = ({ fetchTaskLogs, taskLogs = [] }) => {
  const classes = useStyles();

  const handleFetchTaskLogs = useCallback(() => {
    fetchTaskLogs();
  }, [fetchTaskLogs]);

  return (
    <div className={classes.root}>
      <Button onClick={handleFetchTaskLogs}>Загрузить историю</Button>
      <div>
        {taskLogs.map(taskLog => (
          <HistoryComment key={taskLog.id} {...taskLog} />
        ))}
      </div>
    </div>
  );
};
