import React from 'react';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import StopIcon from '@material-ui/icons/StopRounded';

import { useStyles } from './styles';

export interface IStartStopBtnProps {
  className?: string;
  classes?: any;
  isLarge?: boolean;
  isStarted?: boolean;
  onStart?: (event: React.SyntheticEvent<any>) => any;
  onStop?: (event: React.SyntheticEvent<any>) => any;
  width?: number;
}

export const StartStopBtnTsx: React.FunctionComponent<IStartStopBtnProps> = ({ isStarted, onStart, onStop }) => {
  const classes = useStyles();

  if (isStarted) {
    return (
      <Tooltip title="Остановить задачу" placement={'right'}>
        <Fab onClick={onStop} className={classes.stop} size="small">
          <StopIcon />
        </Fab>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Начать задачу" placement={'right'}>
      <Fab aria-label="Play button" className={classes.play} onClick={onStart} size="small">
        <PlayArrowRounded />
      </Fab>
    </Tooltip>
  );
};
