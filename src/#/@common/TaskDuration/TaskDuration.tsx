import React, { useCallback, useMemo, useState } from 'react';
import Popover from 'react-popover';

import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { millisecondsToTime } from '#/@store/@common/helpers';

import CurrentDurationItem from './CurrentDurationItem';
import { ReactComponent as HourglassSvg } from './hourglass.svg';
import { UserWorkTable } from './UserWorkTable';

import { ITask } from '@types';

export interface ITaskDurationProps {
  currentTaskId: number | string;
  getTaskById: (id: string | number) => ITask;
  taskId: number | string;
}

export const useStyles = makeStyles((theme: Theme) => ({
  duration: {
    '& > button': {
      padding: theme.spacing(0.75, 0),
      width: '100%',
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    width: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      // display: 'inline-block',
    },
  },
  time: {
    '& > div': {
      lineHeight: 1,
    },
    '& > div:first-child': {
      alignSelf: 'center',
      marginRight: theme.spacing(1),
    },
    '& svg': {
      color: theme.palette.secondary.main,
      height: 20,
      width: 15,
    },
    alignContent: 'flex-start',
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'space-between',
    width: theme.spacing(10),
  },
  userWorkTable: {
    zIndex: 1300,
  },
}));

export const TaskDurationTsx: React.FC<ITaskDurationProps> = ({ currentTaskId, getTaskById, taskId }) => {
  const classes = useStyles();

  const task = useMemo(() => {
    return getTaskById(taskId);
  }, [getTaskById, taskId]);

  const isCurrent = useMemo(() => task && task.id === currentTaskId, [currentTaskId, task]);

  const [isWorkTableOpen, setIsWorkTableOpen] = useState(false);

  const onToggleOpenWorkTable = useCallback(() => setIsWorkTableOpen(st => !st), [setIsWorkTableOpen]);

  const didNotTouched = task.duration === '00:00';

  const ConvertedTime = () => {
    const time = task && task.userTasks && task.userTasks.length ? task.userTasks.map(task => task.time) : [];
    const convertedTime = millisecondsToTime(time[0]);
    const { hours, minutes } = convertedTime;
    return (
      <div className={classes.time}>
        <div>
          <HourglassSvg />
        </div>
        <div>
          <div>{hours < 10 ? `0${hours}` : hours}</div>
          <div>час</div>
        </div>
        <div>:</div>
        <div>
          <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
          <div>мин</div>
        </div>
      </div>
    );
  };

  return (
    <Popover
      tipSize={4}
      className={classes.userWorkTable}
      isOpen={isWorkTableOpen}
      onOuterAction={onToggleOpenWorkTable}
      body={task ? <UserWorkTable task={task} onClose={onToggleOpenWorkTable} /> : <div />}
    >
      <div className={classes.duration}>
        {isCurrent ? (
          <CurrentDurationItem isOpen={isWorkTableOpen} onClick={onToggleOpenWorkTable} />
        ) : (
          <Tooltip
            placement={'right'}
            title={
              didNotTouched
                ? 'Вы пока не работали над этой задачей'
                : isWorkTableOpen
                ? 'Закрыть подробности'
                : 'Нажмите, чтоб раскрыть подробности'
            }
          >
            <Button onClick={task.duration === '00:00' ? undefined : onToggleOpenWorkTable}>
              <ConvertedTime />
            </Button>
          </Tooltip>
        )}
      </div>
    </Popover>
  );
};
