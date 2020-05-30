import React, { useCallback, useMemo, useState } from 'react';

import cn from 'classnames';

import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import StopIcon from '@material-ui/icons/StopRounded';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { SpeedDial } from './SpeedDeal';

import { ITask } from '@types';

export interface IStartStopBtnProps {
  afterStop?: any;
  currentTaskId: number;
  isPaused: boolean;
  isLarge?: boolean;
  isStarted: boolean;
  theme: Theme;
  onStart: (task: { projectId?: number; taskId: number | string }) => any;
  onStop: (event: React.SyntheticEvent<any>) => any;
  onStopPaused: (...a: any) => any;
  onPause: (event: React.SyntheticEvent<any>) => any;
  task?: ITask;
  width?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    play: {
      '& svg': {
        height: '32px',
        width: '32px',
      },
      backgroundColor: '#66cc33',
      color: 'white',
    },
    speedDial: {
      '& svg': {
        height: '32px',
        width: '32px',
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        left: theme.spacing(2),
        top: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      marginLeft: theme.spacing(-9),
    },
    stop: {
      '& svg': {
        height: '32px',
        width: '32px',
      },
      backgroundColor: theme.palette.error.main,
      color: theme.palette.background.paper,
    },
    stopOpen: {
      '& svg': {
        height: '32px',
        width: '32px',
      },
      backgroundColor: '#d8d8d8!important',
      color: theme.palette.background.paper,
    },
  })
);

export const StartStopBtnTsx: React.FunctionComponent<IStartStopBtnProps> = ({
  afterStop,
  currentTaskId,
  isPaused,
  isLarge,
  theme,
  onStart,
  onStop,
  onStopPaused,
  onPause,
  task,
  width,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const isCurrent = useMemo(() => {
    return !task || task.id === currentTaskId;
  }, [currentTaskId, task]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleStart = useCallback(
    event => {
      if (!task) {
        return;
      }
      const { id, projectId } = task;
      event.stopPropagation();
      onStart({
        projectId,
        taskId: id,
      });
    },
    [onStart, task]
  );

  const handlePause = useCallback(
    e => {
      e.stopPropagation();
      if (onPause) {
        onPause(e);
      }
      setOpen(false);
      if (afterStop) {
        afterStop();
      }
    },
    [afterStop, onPause, setOpen]
  );

  const handleStop = useCallback(
    e => {
      e.stopPropagation();
      if (onStop) {
        onStop(e);
      }
      setOpen(false);
      if (afterStop) {
        afterStop();
      }
    },
    [afterStop, onStop, setOpen]
  );

  const handleResume = useCallback(
    event => {
      event.stopPropagation();
      onStart({ taskId: currentTaskId });
    },
    [currentTaskId, onStart]
  );

  const handleStopPaused = useCallback(
    e => {
      e.stopPropagation();
      onStopPaused();
    },
    [onStopPaused]
  );

  let size: 'small' | 'medium' = width && width < theme.breakpoints.values.sm ? 'small' : 'medium';
  if (isLarge) {
    size = 'medium';
  }
  const SpeedDialComponent = SpeedDial as any;
  if (isCurrent) {
    if (isPaused) {
      return (
        <SpeedDialComponent
          onClick={handleResume}
          ariaLabel="Resume Button"
          className={classes.speedDial}
          icon={<PauseIcon fontSize={isLarge ? 'large' : 'default'} />}
          openIcon={<PlayArrowRounded fontSize={isLarge ? 'large' : 'default'} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="left"
          FabProps={{ className: cn(classes.stopOpen, { [classes.play]: open }), size }}
        >
          <SpeedDialAction
            icon={<StopIcon />}
            tooltipTitle="Завершить задачу"
            tooltipPlacement="top"
            onClick={handleStopPaused}
            className={classes.stop}
          />
        </SpeedDialComponent>
      );
    } else {
      return (
        <SpeedDialComponent
          onClick={handlePause}
          ariaLabel="Stop Button"
          className={classes.speedDial}
          icon={<StopIcon fontSize={isLarge ? 'large' : 'default'} />}
          openIcon={<PauseIcon fontSize={isLarge ? 'large' : 'default'} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="left"
          FabProps={{ className: cn(classes.stop, { [classes.stopOpen]: open }), size }}
        >
          <SpeedDialAction
            icon={<StopIcon />}
            tooltipTitle="Завершить задачу"
            tooltipPlacement="top"
            onClick={handleStop}
            className={classes.stop}
          />
        </SpeedDialComponent>
      );
    }
  }
  return (
    <Tooltip title="Начать задачу" placement={'right'}>
      <Fab aria-label="Play button" className={classes.play} onClick={handleStart} size={size as any}>
        <PlayArrowRounded fontSize={isLarge ? 'large' : 'default'} />
      </Fab>
    </Tooltip>
  );
};
